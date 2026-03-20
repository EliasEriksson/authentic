from __future__ import annotations

import asyncio
import contextlib
from functools import reduce
from typing import *

from sqlalchemy import Select, Sequence, Delete
from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import InstrumentedAttribute, joinedload

from ..models.base import Model


class TransactionGuard:
    _lock: asyncio.Lock
    _future: asyncio.Future[bool] | None
    _count: int

    def __init__(self):
        self._count = 0
        self._lock = asyncio.Lock()
        self._future = None

    async def increment(self) -> bool:
        result = False
        async with self._lock:
            if self._count == 0 and not self._future:
                self._future = asyncio.Future()
                result = True
            self._count += 1
        return result

    async def decrement(self) -> bool:
        result = False
        async with self._lock:
            self._count -= 1
            if self._count == 0 and self._future:
                future = self._future
                self._future = None
                future.set_result(True)
                result = True
        return result

    async def join(self) -> None:
        while self._future:
            await self._future


class Operator:
    _reader: AsyncSession
    _writer: AsyncSession
    _writer_lock: asyncio.Lock
    _transaction_guard: TransactionGuard

    def __init__(self, reader: AsyncSession, writer: AsyncSession) -> None:
        self._reader = reader
        self._writer = writer
        self._writer_lock = asyncio.Lock()
        self._transaction_guard = TransactionGuard()

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
        joins: Iterable[Sequence[InstrumentedAttribute[Any]]] | None = None,
    ) -> T:
        for segments in joins or []:
            if segments:
                join = joinedload(segments[0])
                for segment in segments[1:]:
                    join = join.joinedload(segment)
                query = query.options(join)
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
    async def transaction(self, *, merge: bool = True) -> AsyncIterator[AsyncSession]:
        await self._transaction_guard.increment()
        await self._writer_lock.acquire()
        if self._writer.in_transaction():
            self._writer_lock.release()
            yield self._writer
            await self._transaction_guard.decrement()
            return
        async with self._writer.begin():
            self._writer_lock.release()
            yield self._writer
            targets = [
                *(model for model in self._writer.new),
                *(model for model in self._writer.dirty),
                *(model for model in self._writer.deleted),
            ]
            await self._transaction_guard.decrement()
            await self._transaction_guard.join()
            await self._writer_lock.acquire()
        if not merge:
            self._writer_lock.release()
            return
        await asyncio.gather(
            *[
                asyncio.create_task(self._reader.merge(target, load=False))
                for target in targets
            ]
        )
        self._writer_lock.release()

        # @contextlib.asynccontextmanager
        # async def transaction(self, *, merge=True) -> AsyncIterator[AsyncSession]:
        #     if self._writer.in_transaction():
        #         yield self._writer
        #         return
        #     async with self._writer.begin():
        #         yield self._writer
        #         targets = [
        #             *(model for model in self._writer.new),
        #             *(model for model in self._writer.dirty),
        #             *(model for model in self._writer.deleted),
        #         ]
        #     if not merge:
        #         return
        #     await asyncio.gather(
        #         *[
        #             asyncio.create_task(self._reader.merge(target, load=False))
        #             for target in targets
        #         ]
        #     )
