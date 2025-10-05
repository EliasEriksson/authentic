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
            .where(models.Email.user_id == models.Password.user_id)
            .where(models.Email.address == email)
        )
        return await self._operator.fetch(query)

    async def create(self, user: models.User, password: str) -> models.Password:
        digest = models.Password.hash(password)
        async with self._operator.transaction() as session:
            if user.password is None:
                result = models.Password(user_id=user.id, digest=digest)
                session.add(result)
            else:
                user.password.digest = digest
                result = user.password
        return result
