from __future__ import annotations

import contextlib
from typing import *
from uuid import UUID
from functools import reduce

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, InstrumentedAttribute
from sqlalchemy.sql import ColumnExpressionArgument

from .... import schemas
from ... import models
from ..operator import Operator

if TYPE_CHECKING:
    from ..client import Client


class Users:
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
            Callable[[Type[models.User]], Iterable[ColumnExpressionArgument]] | None
        ) = None,
    ) -> Sequence[models.User]:
        query = (
            select(models.User)
            .limit(limit)
            .offset(offset)
            .options(joinedload(models.User.emails))
            .options(joinedload(models.User.memberships))
        )
        if search is not None:
            for criteria in search(models.User):
                query = query.where(criteria)
        return await self._operator.list(query)

    async def fetch_by_email(
        self, email: str, *, joins: Sequence[InstrumentedAttribute[Any]] | None = None
    ) -> models.User:
        query = (
            select(models.User)
            .where(models.User.id == models.Email.user_id)
            .where(models.Email.address == email)
        )
        if joins:
            reduce(lambda result, join: result.options(joinedload(join)), joins, query)

        return await self._operator.fetch(query)

    async def fetch_by_key(self, id: UUID) -> models.User:
        query = (
            select(models.User)
            .where(models.User.id == id)
            .options(joinedload(models.User.emails))
            .options(joinedload(models.User.memberships))
        )
        return await self._operator.fetch(query)

    async def create(self, schema: schemas.user.Creatable) -> models.User:
        async with self._operator.transaction() as session:
            user = models.User(name=schema.name)
            session.add(user)
            await session.flush()
            email = models.Email(user=user, address=schema.email)
            session.add(email)
            await self._client.organizations.create(
                user.id,
                schemas.organization.Creatable(
                    name=f"{schema.name}'s organization",
                    open=False,
                ),
            )
        return await self.fetch_by_key(user.id)

    async def update(
        self,
        model: models.User,
        schema: schemas.user.Mutable,
    ) -> models.User:
        async with self._operator.transaction():
            model.name = schema.name
        return model

    async def delete(self, *models: models.User) -> Sequence[models.User]:
        return await self._operator.delete(*models)

    @contextlib.asynccontextmanager
    async def transaction(self) -> AsyncIterable[AsyncSession]:
        async with self._operator.transaction() as session:
            yield session
