from __future__ import annotations

import contextlib
from typing import *
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession

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
        user = await self._client.users.fetch_by_email(
            data.email, joins=[models.User.password_reset]
        )
        if user.password_reset and user.password_reset.verify(data.password):
            digest = models.Password.hash(data.new_password)
            async with self._operator.transaction() as session:
                try:
                    password = await self._client.passwords.fetch_by_user_id(user.id)
                    password.digest = digest
                except NoResultFound:
                    password = models.Password(user_id=user.id, digest=digest)
                session.add(password)
                password.digest = digest
                await self._client.password_reset.delete_by_user_id(user.id)
            return True
        password = await self.fetch_by_email(data.email)
        if not password.verify(data.password):
            return False
        async with self._operator.transaction():
            password.digest = password.hash(data.password)
        return True

    @contextlib.asynccontextmanager
    async def transaction(self) -> AsyncIterable[AsyncSession]:
        async with self._operator.transaction() as session:
            yield session
