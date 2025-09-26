from __future__ import annotations

import asyncio
import contextlib
from typing import *
from functools import reduce

from sqlalchemy import Select, Sequence
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import InstrumentedAttribute, joinedload
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.base import Model


class Operator:
    _reader: AsyncSession
    _writer: AsyncSession

    def __init__(self, reader: AsyncSession, writer: AsyncSession) -> None:
        self._reader = reader
        self._writer = writer

    async def list[T: Model](self, query: Select[Tuple[T]]) -> Sequence[T]:
        result = await self._reader.execute(query)
        models = result.unique().scalars().all()
        async with self.transaction(merge=False) as session:
            return await asyncio.gather(
                *[
                    asyncio.create_task(session.merge(model, load=False))
                    for model in models
                ]
            )

    async def fetch[T: Model](
        self,
        query: Select[Tuple[T]],
        *,
        joins: Sequence[InstrumentedAttribute[Any]] | None = None,
    ) -> T:
        if joins:
            query = reduce(
                lambda result, join: result.options(joinedload(join)), joins, query
            )
        result = await self._reader.execute(query)
        model = result.scalars().first()
        if model is None:
            raise NoResultFound("No row was found when one was required")
        async with self.transaction(merge=False) as session:
            return await session.merge(model, load=False)

    async def add[T: Model](self, *models: T) -> Sequence[T]:
        async with self.transaction() as session:
            for model in models:
                session.add(model)
        return models

    async def delete[T: Model](self, *models: T) -> Sequence[T]:
        async with self.transaction() as session:
            result = await asyncio.gather(*[session.delete(model) for model in models])
        return result

    @contextlib.asynccontextmanager
    async def transaction(self, *, merge=True) -> AsyncIterator[AsyncSession]:
        if self._writer.in_transaction():
            yield self._writer
            return
        async with self._writer.begin():
            yield self._writer
            targets = [
                *(model for model in self._writer.new),
                *(model for model in self._writer.dirty),
                *(model for model in self._writer.deleted),
            ]
        if not merge:
            return
        await asyncio.gather(
            *[
                asyncio.create_task(self._reader.merge(target, load=False))
                for target in targets
            ]
        )
