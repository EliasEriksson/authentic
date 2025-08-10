from __future__ import annotations
from typing import *
from ... import models
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, desc
from uuid import UUID
import asyncio


# noinspection DuplicatedCode
class Applications:
    _session: AsyncSession
    _lock: asyncio.Lock

    def __init__(self, session: AsyncSession) -> None:
        self._session = session
        self._lock = asyncio.Lock()

    async def fetch_by_key(self, id: UUID) -> models.Application:
        query = select(models.Application).where(models.Application.id == id)
        result = await self._session.execute(query)
        return result.scalars().first()

    async def list(
        self, limit: int | None = None, offset: int | None = None
    ) -> Sequence[models.Application]:
        limit = limit or 10
        offset = offset or 0
        query = (
            select(models.Application)
            .limit(limit)
            .offset(offset)
            .order_by(desc(models.Application.created))
        )
        result = await self._session.execute(query)
        return result.scalars().all()

    async def create(
        self, application: models.application.ApplicationProtocol
    ) -> models.Application:
        model = models.Application.create(application)
        async with self._lock:
            async with self._session.begin():
                self._session.add(model)
        return model

    async def update(
        self, id: UUID, application: models.application.ApplicationProtocol
    ) -> models.Application:
        model = await self.fetch_by_key(id)
        async with self._lock:
            async with self._session.begin():
                model.update(application)
        return model

    async def delete_by_key(self, id: UUID) -> bool:
        query = delete(models.Application).where(models.Application.id == id)
        async with self._lock:
            async with self._session.begin():
                result = await self._session.execute(query)
        return result.rowcount != 0
