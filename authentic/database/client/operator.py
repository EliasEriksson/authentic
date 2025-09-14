from __future__ import annotations

import asyncio
import contextlib
from contextlib import nullcontext
from typing import *

from sqlalchemy import Select, Sequence
from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.base import Model


class Operator:
    _lock: asyncio.Lock
    _reader: AsyncSession
    _writer: AsyncSession

    def __init__(self, reader: AsyncSession, writer: AsyncSession) -> None:
        self._lock = asyncio.Lock()
        self._reader = reader
        self._writer = writer

    async def list[T: Model](self, query: Select[Tuple[T]]) -> Sequence[T]:
        result = await self._reader.execute(query)
        models = result.unique().scalars().all()
        transaction = (
            nullcontext(self._writer)
            if self._writer.in_transaction()
            else self.transaction()
        )
        async with transaction as session:
            return await asyncio.gather(
                *[
                    asyncio.create_task(session.merge(model, load=False))
                    for model in models
                ]
            )

    async def fetch[T: Model](self, query: Select[Tuple[T]]) -> T:
        result = await self._reader.execute(query)
        model = result.scalars().first()
        if model is None:
            raise NoResultFound("No row was found when one was required")
        transaction = (
            nullcontext(self._writer)
            if self._writer.in_transaction()
            else self.transaction()
        )
        async with transaction as session:
            return await session.merge(model, load=False)

    async def add[T: Model](
        self, *models: T, session: AsyncSession | None = None
    ) -> Sequence[T]:
        transaction = nullcontext(session) if session else self.transaction()
        async with transaction as session:
            for model in models:
                session.add(model)
        return models

    async def delete[T: Model](
        self, *models: T, session: AsyncSession | None = None
    ) -> Sequence[T]:
        transaction = nullcontext(session) if session else self.transaction()
        async with transaction as session:
            result = await asyncio.gather(*[session.delete(model) for model in models])
        return result

    @contextlib.asynccontextmanager
    async def transaction(self) -> AsyncIterator[AsyncSession]:
        async with self._lock:
            async with self._writer.begin():
                yield self._writer
                targets = [
                    *(model for model in self._writer.new),
                    *(model for model in self._writer.dirty),
                    *(model for model in self._writer.deleted),
                ]
            await asyncio.gather(
                *[
                    asyncio.create_task(self._reader.merge(target, load=False))
                    for target in targets
                ]
            )
