from __future__ import annotations
from typing import *
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    create_async_engine,
    AsyncEngine,
    async_sessionmaker,
)
from .client import Client
import contextlib
from authentic.configuration import Configuration


class Database:
    _configuration: Configuration
    _engine: AsyncEngine
    _session_maker: async_sessionmaker[AsyncSession]

    def __init__(self, engine: AsyncEngine) -> None:
        self._engine = engine
        self._session_maker = async_sessionmaker(self._engine, expire_on_commit=False)

    @contextlib.asynccontextmanager
    async def client(self) -> AsyncIterator[Client]:
        async with self._session_maker() as session:
            yield Client(session)

    @classmethod
    @contextlib.asynccontextmanager
    async def open(
        cls, configuration: Configuration | None = None
    ) -> AsyncIterator[Database]:
        configuration = configuration or Configuration()
        engine = create_async_engine("")
        try:
            yield cls(engine)
        finally:
            await engine.dispose()
