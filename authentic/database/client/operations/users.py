from typing import *
from ... import models
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, desc
from uuid import UUID
import asyncio


# noinspection DuplicatedCode
class Users:
    _session: AsyncSession
    _lock: asyncio.Lock

    def __init__(self, session: AsyncSession) -> None:
        self._session = session
        self._lock = asyncio.Lock()

    async def fetch_by_key(self, id: UUID) -> models.User:
        query = select(models.User).where(models.User.id == id)
        result = await self._session.execute(query)
        return result.scalars().first()

    async def list(
        self, limit: int | None = None, offset: int | None = None
    ) -> Sequence[models.User]:
        limit = limit or 10
        offset = offset or 0
        query = (
            select(models.User)
            .limit(limit)
            .offset(offset)
            .order_by(desc(models.User.created))
        )
        result = await self._session.execute(query)
        return result.scalars().all()

    async def create(self, user: models.user.UserProtocol):
        model = models.User.create(user)
        async with self._lock:
            async with self._session.begin():
                self._session.add_all(model)
        return model

    async def update(self, id: UUID, user: models.user.UserProtocol) -> models.User:
        model = await self.fetch_by_key(id)
        async with self._lock:
            async with self._session.begin():
                model.update(user)
        return model

    async def delete_by_key(self, id: UUID) -> bool:
        query = delete(models.User).where(models.User.id == id)
        async with self._lock:
            async with self._session.begin():
                result = await self._session.execute(query)
        return result.rowcount != 0
