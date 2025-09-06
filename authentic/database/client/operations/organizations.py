from __future__ import annotations
from typing import *

from uuid import UUID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import ColumnExpressionArgument

from ..operator import Operator
from ... import models
from .... import schemas

import contextlib


class Organizations:
    _operator: Operator

    def __init__(self, operator: Operator) -> None:
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
        self, owner_id: UUID, schema: schemas.organization.Creatable
    ) -> models.Organization:
        async with self._operator.transaction() as session:
            organization = models.Organization(name=schema.name, open=schema.open)
            await session.flush()
            models.Membership(
                organization=organization,
                user_id=owner_id,
                invitation=True,
                request=True,
            )
        return organization

    async def update(
        self, model: models.Organization, schema: schemas.organization.Mutable
    ) -> models.Organization:
        async with self._operator.transaction():
            model.name = schema.name
            model.open = schema.open
        return model

    async def delete(
        self, *models: models.Organization
    ) -> Sequence[models.Organization]:
        return await self._operator.delete(*models)

    @contextlib.asynccontextmanager
    async def transaction(self) -> AsyncIterable[AsyncSession]:
        async with self._operator.transaction() as session:
            yield session
