from __future__ import annotations

import contextlib
from contextlib import nullcontext
from typing import *
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import ColumnExpressionArgument

from .... import schemas
from ... import models
from ..operator import Operator

if TYPE_CHECKING:
    from ..client import Client


class Applications:
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
            Callable[[Type[models.Application]], Iterable[ColumnExpressionArgument]]
            | None
        ) = None,
    ) -> Sequence[models.Application]:
        query = select(models.Application).limit(limit).offset(offset)
        if search:
            for criteria in search(models.Application):
                query = query.where(criteria)
        return await self._operator.list(query)

    async def fetch_identity(self) -> models.Application:
        query = select(models.Identity)
        identity = await self._operator.fetch(query)
        return await self.fetch_by_key(identity.id)

    async def fetch_by_key(self, id: UUID) -> models.Application:
        query = (
            select(models.Application)
            .where(models.Application.id == id)
            .options(joinedload(models.Application.subscribers))
        )
        return await self._operator.fetch(query)

    async def create(
        self,
        owner_id: UUID,
        schema: schemas.application.Creatable,
        *,
        session: AsyncSession | None = None,
    ) -> models.Application:
        transaction = nullcontext(session) if session else self._operator.transaction()
        async with transaction as session:
            application = models.Application(name=schema.name, open=schema.open)
            await session.flush()
            models.Subscription(
                application=application,
                organization_id=owner_id,
                invitation=True,
                request=True,
            )
        return application

    async def update(
        self,
        model: models.Application,
        schema: schemas.application.Mutable,
        *,
        session: AsyncSession | None = None,
    ) -> models.Application:
        transaction = nullcontext(session) if session else self._operator.transaction()
        async with transaction:
            model.name = schema.name
            model.open = schema.open
        return model

    async def delete(
        self, *models: models.Application, session: AsyncSession | None = None
    ) -> Sequence[models.Application]:
        return await self._operator.delete(*models, session=session)

    @contextlib.asynccontextmanager
    async def transaction(self) -> AsyncIterable[AsyncSession]:
        async with self._operator.transaction() as session:
            yield session
