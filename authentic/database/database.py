from __future__ import annotations
from typing import *
from ..configuration import Configuration
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    AsyncEngine,
    create_async_engine,
    async_sessionmaker,
)
import contextlib
from .client import Client


class Database:
    _configuration: Configuration
    _engine: AsyncEngine
    _session_maker: async_sessionmaker[AsyncSession]

    def __init__(self, engine: AsyncEngine) -> None:
        self._engine = engine
        self._session_maker = async_sessionmaker(
            bind=engine,
            expire_on_commit=False,
        )

    @contextlib.asynccontextmanager
    async def client(self) -> AsyncIterator[Client]:
        async with self._session_maker() as reader:
            async with self._session_maker() as writer:
                yield Client(reader, writer)

    @classmethod
    @contextlib.asynccontextmanager
    async def open(
        cls, configuration: Configuration | None = None
    ) -> AsyncIterator[Self]:
        configuration = configuration or Configuration()
        engine = create_async_engine(configuration.database.url)
        try:
            yield cls(engine)
        finally:
            await engine.dispose()
