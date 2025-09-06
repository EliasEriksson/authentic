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


class Users:
    _operator: Operator

    def __init__(self, operator: Operator) -> None:
        self._operator = operator

    async def list(
        self,
        limit: int | None = None,
        offset: int | None = None,
        search: (
            Callable[[Type[models.User]], Iterable[ColumnExpressionArgument]] | None
        ) = None,
    ) -> Sequence[models.User]:
        query = select(models.User).limit(limit).offset(offset).where()
        if search is not None:
            for criteria in search(models.User):
                query = query.where(criteria)
        return await self._operator.list(query)

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
            models.Email(user=user, address=schema.email)
        return user

    async def update(
        self, model: models.User, schema: schemas.user.Mutable
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
