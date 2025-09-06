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


class Applications:
    _operator: Operator

    def __init__(self, operator: Operator) -> None:
        self._operator = operator

    async def list(
        self,
        limit: int | None = None,
        offset: int | None = None,
        search: (
            Callable[[Type[models.Application]], Iterable[ColumnExpressionArgument]]
            | None
        ) = None,
    ) -> Sequence[models.Application]:
        query = select(models.Application).limit(limit).offset(offset)
        if search:
            for criteria in search(models.Application):
                query = query.where(criteria)
        return await self._operator.list(query)

    async def fetch_by_key(self, id: UUID) -> models.Application:
        query = (
            select(models.Application)
            .where(models.Application.id == id)
            .options(joinedload(models.Application.subscribers))
        )
        return await self._operator.fetch(query)

    async def create(
        self, owner_id: UUID, schema: schemas.application.Creatable
    ) -> models.Application:
        async with self._operator.transaction() as session:
            application = models.Application(name=schema.name, open=schema.open)
            await session.flush()
            models.Subscription(
                application=application,
                organization_id=owner_id,
                invitation=True,
                request=True,
            )
        return application

    @contextlib.asynccontextmanager
    async def transaction(self) -> AsyncIterable[AsyncSession]:
        async with self._operator.transaction() as session:
            yield session
