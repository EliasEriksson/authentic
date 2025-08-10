from __future__ import annotations
from typing import *
from ... import models
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, desc
from uuid import UUID
import asyncio


# noinspection DuplicatedCode
class Organizations:
    _session: AsyncSession
    _lock: asyncio.Lock

    def __init__(self, session: AsyncSession) -> None:
        self._session = session
        self._lock = asyncio.Lock()

    async def fetch_by_key(self, id: UUID) -> models.Organization:
        query = select(models.Organization).where(models.Organization.id == id)
        result = await self._session.execute(query)
        return result.scalars().first()

    async def list(
        self, limit: int | None = None, offset: int | None = None
    ) -> Sequence[models.Organization]:
        limit = limit or 10
        offset = offset or 0
        query = (
            select(models.Organization)
            .limit(limit)
            .offset(offset)
            .order_by(desc(models.Organization.created))
        )
        result = await self._session.execute(query)
        return result.scalars().all()

    async def create(self, organization: models.Organization) -> models.Organization:
        model = models.Organization.create(organization)
        async with self._lock:
            async with self._session.begin():
                self._session.add(model)
        return model

    async def update(
        self, id: UUID, organization: models.organization.OrganizationProtocol
    ) -> models.Organization:
        model = await self.fetch_by_key(id)
        async with self._lock:
            async with self._session.begin():
                model.update(organization)
        return model

    async def delete_by_key(self, id: UUID) -> bool:
        query = delete(models.Organization).where(models.Organization.id == id)
        async with self._lock:
            async with self._session.begin():
                result = await self._session.execute(query)
        return result.rowcount != 0
