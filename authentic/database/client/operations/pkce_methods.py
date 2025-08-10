from __future__ import annotations
from typing import *
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, desc
from uuid import UUID
from ... import models


class PKCEMethods:
    _session: AsyncSession

    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def fetch_by_key(self, id: UUID) -> models.PKCEMethod:
        query = select(models.PKCEMethod).where(models.PKCEMethod.id == id)
        result = await self._session.execute(query)
        return result.scalars().first()

    async def list(
        self, limit: int | None = None, offset: int | None = None
    ) -> Sequence[models.PKCEMethod]:
        limit = limit or 10
        offset = offset or 0
        query = (
            select(models.PKCEMethod)
            .limit(limit)
            .offset(offset)
            .order_by(desc(models.PKCEMethod.created))
        )
        result = await self._session.execute(query)
        return result.scalars().all()

    async def create(self, name: str) -> models.PKCEMethod:
        model = models.PKCEMethod.create(name=name)
        self._session.add(model)
        await self._session.commit()
        return model
