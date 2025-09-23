from __future__ import annotations

import contextlib
from contextlib import nullcontext
from typing import *
from uuid import UUID

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import ColumnExpressionArgument

from .... import schemas
from ... import models
from ..operator import Operator

if TYPE_CHECKING:
    from ..client import Client


class PasswordResets:
    _client: Client
    _operator: Operator

    def __init__(self, client: Client, operator: Operator) -> None:
        self._client = client
        self._operator = operator

    async def fetch_by_email(self, email: str) -> models.PasswordReset:
        query = (
            select(models.PasswordReset)
            .where(models.PasswordReset.user_id == models.User.id)
            .where(models.User.emails == email)
        )
        return await self._operator.fetch(query)

    async def fetch_by_code(self, code: str) -> models.PasswordReset:
        query = select(models.PasswordReset).where(models.PasswordReset.code == code)
        return await self._operator.fetch(query)

    async def create(self, data: schemas.password.ResetRequest) -> models.PasswordReset:
        user = await self._client.users.fetch_by_email(data.email)
        await self.delete_by_user_id(user.id)
        async with self._operator.transaction() as session:
            password_reset = models.PasswordReset(
                user_id=user.id,
                code=models.PasswordReset.generate_code(),
            )
            session.add(password_reset)
        return password_reset

    async def delete_by_user_id(self, user_id: UUID) -> None:
        query = delete(models.PasswordReset).where(
            models.PasswordReset.user_id == user_id
        )
        async with self._operator.transaction() as session:
            await session.execute(query)

    @contextlib.asynccontextmanager
    async def transaction(self) -> AsyncIterable[AsyncSession]:
        async with self._operator.transaction() as session:
            yield session
