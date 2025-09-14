from __future__ import annotations

import contextlib
from contextlib import nullcontext
from typing import *
from uuid import UUID
from wsgiref.util import application_uri

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import ColumnExpressionArgument

from .... import schemas
from ... import models
from ..operator import Operator

if TYPE_CHECKING:
    from ..client import Client


class Organizations:
    _client: Client
    _operator: Operator

    def __init__(self, client: Client, operator: Operator) -> None:
        self._client = client
        self._operator = operator

    async def list(
        self,
        limit: int | None = None,
        offset: int | None = None,
        search: (
            Callable[[Type[models.Organization]], Iterable[ColumnExpressionArgument]]
            | None
        ) = None,
    ) -> Sequence[models.Organization]:
        query = select(models.Organization).limit(limit).offset(offset)
        if search:
            for criteria in search(models.Organization):
                query = query.where(criteria)
        return await self._operator.list(query)

    async def fetch_by_key(self, id: UUID) -> models.Organization:
        query = (
            select(models.Organization)
            .where(models.Organization.id == id)
            .options(joinedload(models.Organization.members))
            .options(joinedload(models.Organization.subscriptions))
        )
        return await self._operator.fetch(query)

    async def create(
        self,
        owner_id: UUID,
        schema: schemas.organization.Creatable,
        *,
        session: AsyncSession | None = None,
    ) -> models.Organization:
        transaction = nullcontext(session) if session else self._operator.transaction()
        async with transaction as session:
            organization = models.Organization(name=schema.name, open=schema.open)
            session.add(organization)
            await session.flush()
            membership = models.Membership(
                organization=organization,
                user_id=owner_id,
                invitation=True,
                request=True,
            )
            session.add(membership)
            application = await self._client.applications.fetch_identity()
            subscription = models.Subscription(
                organization=organization,
                application=application,
                invitation=True,
                request=True,
            )
            session.add(subscription)
        return organization

    async def update(
        self,
        model: models.Organization,
        schema: schemas.organization.Mutable,
        *,
        session: AsyncSession | None = None,
    ) -> models.Organization:
        transaction = nullcontext(session) if session else self._operator.transaction()
        async with transaction:
            model.name = schema.name
            model.open = schema.open
        return model

    async def delete(
        self, *models: models.Organization, session: AsyncSession | None = None
    ) -> Sequence[models.Organization]:
        return await self._operator.delete(*models, session=session)

    @contextlib.asynccontextmanager
    async def transaction(self) -> AsyncIterable[AsyncSession]:
        async with self._operator.transaction() as session:
            yield session
