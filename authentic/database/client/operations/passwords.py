from __future__ import annotations

import contextlib
from contextlib import nullcontext
from datetime import UTC, datetime, timedelta
from typing import *
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import ColumnExpressionArgument

from .... import schemas
from ... import models
from ..operator import Operator

if TYPE_CHECKING:
    from ..client import Client


class Passwords:
    _client: Client
    _operator: Operator

    def __init__(self, client: Client, operator: Operator) -> None:
        self._client = client
        self._operator = operator

    async def fetch_by_user_id(self, user_id: UUID) -> models.Password:
        query = select(models.Password).where(models.Password.user_id == user_id)
        return await self._operator.fetch(query)

    async def fetch_by_email(self, email: str) -> models.Password:
        query = (
            select(models.Password)
            .where(models.Email.address == email)
            .where(models.Email.user_id == models.Password.user_id)
        )
        return await self._operator.fetch(query)

    async def reset(self, data: schemas.password.Reset) -> bool:
        try:
            password_reset = await self._client.password_reset.fetch_by_code(
                data.password
            )
        except NoResultFound:
            password = await self.fetch_by_email(data.email)
            if not password.verify(data.password):
                return False
            async with self._operator.transaction():
                password.digest = password.hash(data.password)
            return True
        if (datetime.now(UTC) - password_reset.created) > (timedelta(hours=1)):
            return False

        digest = models.Password.hash(data.new_password)
        async with self._operator.transaction() as session:
            try:
                password = await self._client.passwords.fetch_by_user_id(
                    password_reset.user_id
                )
                password.digest = digest
            except NoResultFound:
                password = models.Password(
                    user_id=password_reset.user_id,
                    digest=digest,
                )
            session.add(password)
            password.digest = digest
            await self._client.password_reset.delete_by_user_id(password_reset.user_id)
        return True

    @contextlib.asynccontextmanager
    async def transaction(self) -> AsyncIterable[AsyncSession]:
        async with self._operator.transaction() as session:
            yield session
