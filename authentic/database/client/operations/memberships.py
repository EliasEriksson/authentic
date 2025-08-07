from typing import *
from ... import models
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, desc
from uuid import UUID
import asyncio


# noinspection DuplicatedCode
class Memberships:
    _session: AsyncSession
    _lock = asyncio.Lock()

    def __init__(self, session: AsyncSession) -> None:
        self._session = session
        self._lock = asyncio.Lock()

    async def fetch_by_key(self, organization: UUID, user: UUID) -> models.Membership:
        query = (
            select(models.Membership)
            .where(models.Membership.organization_id == organization)
            .where(models.Membership.user_id == user)
        )
        result = await self._session.execute(query)
        return result.scalars().first()

    async def list(
        self,
        limit: int | None = None,
        offset: int | None = None,
        organization: UUID | None = None,
        user: UUID | None = None,
    ) -> Sequence[models.Membership]:
        limit = limit or 10
        offset = offset or 0
        query = (
            select(models.Membership)
            .limit(limit)
            .offset(offset)
            .order_by(desc(models.Membership.created))
        )
        if organization:
            query = query.where(models.Membership.organization_id == organization)
        if user:
            query = query.where(models.Membership.user_id == user)
        result = await self._session.execute(query)
        return result.scalars().all()

    async def create(
        self, membership: models.membership.MembershipProtocol
    ) -> models.Membership:
        model = models.Membership.create(membership)
        async with self._session.begin():
            self._session.add(model)
        return model

    async def update(
        self,
        organization: UUID,
        user: UUID,
        membership: models.membership.MembershipProtocol,
    ) -> models.Membership:
        model = await self.fetch_by_key(organization, user)
        async with self._lock:
            async with self._session.begin():
                model.update(membership)
        return model

    async def delete_by_key(self, organization: UUID, user: UUID) -> bool:
        query = (
            delete(models.Membership)
            .where(models.Membership.organization_id == organization)
            .where(models.Membership.user_id == user)
        )
        async with self._lock:
            async with self._session.begin():
                result = await self._session.execute(query)
        return result.rowcount != 0
