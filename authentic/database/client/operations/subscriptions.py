from __future__ import annotations
from typing import *
from ... import models
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, desc
from uuid import UUID
import asyncio


# noinspection DuplicatedCode
class Subscriptions:
    _session: AsyncSession
    _lock: asyncio.Lock

    def __init__(self, session: AsyncSession) -> None:
        self._session = session
        self._lock = asyncio.Lock()

    async def fetch_by_key(
        self, application: UUID, organization: UUID
    ) -> models.Subscription:
        query = (
            select(models.Subscription)
            .where(models.Subscription.application_id == application)
            .where(models.Subscription.organization_id == organization)
        )
        async with self._session.begin():
            result = await self._session.execute(query)
        return result.scalars().first()

    async def list(
        self,
        limit: int | None = None,
        offset: int | None = None,
        application: UUID | None = None,
        organization: UUID | None = None,
    ) -> Sequence[models.Subscription]:
        limit = limit or 10
        offset = offset or 0
        query = (
            select(models.Subscription)
            .limit(limit)
            .offset(offset)
            .order_by(desc(models.Subscription.created))
        )
        if application:
            query = query.where(models.Subscription.application_id == application)
        if organization:
            query = query.where(models.Subscription.organization_id == organization)
        async with self._session.begin():
            result = await self._session.execute(query)
        return result.scalars().all()

    async def update(
        self,
        application: UUID,
        organization: UUID,
        subscription: models.subscription.SubscriptionProtocol,
    ) -> models.Subscription:
        model = await self.fetch_by_key(application, organization)
        async with self._session.begin():
            model.update(subscription)
        return model

    async def delete_by_key(self, application: UUID, organization: UUID) -> bool:
        query = (
            delete(models.Subscription)
            .where(models.Subscription.application_id == application)
            .where(models.Subscription.organization_id == organization)
        )
        async with self._session.begin():
            result = await self._session.execute(query)
        return result.rowcount != 0
