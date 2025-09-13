from __future__ import annotations

import asyncio
import contextlib
from typing import *

from alembic.autogenerate import compare_metadata
from alembic.migration import MigrationContext
from sqlalchemy import create_engine, text
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from ..configuration import Configuration
from . import models
from .client import Client


class Database:
    _configuration: Configuration
    _engine: AsyncEngine
    _session_maker: async_sessionmaker[AsyncSession]

    def __init__(self, engine: AsyncEngine) -> None:
        self._configuration = Configuration()
        self._engine = engine
        self._session_maker = async_sessionmaker(
            bind=engine,
            expire_on_commit=False,
        )

    async def ready(self) -> bool:
        engine = await asyncio.to_thread(
            lambda: create_engine(self._configuration.database.url)
        )
        try:
            connection = await asyncio.to_thread(lambda: engine.connect())
            context = await asyncio.to_thread(
                lambda: MigrationContext.configure(connection)
            )
            diffs = await asyncio.to_thread(
                lambda: compare_metadata(context, models.base.Model.metadata)
            )
            return len(diffs) == 0
        finally:
            await asyncio.to_thread(lambda: engine.dispose())

    async def delete(self) -> None:
        async with self._engine.begin() as connection:
            await connection.run_sync(models.base.Model.metadata.drop_all)
            drop_alembic = text(f"DROP TABLE IF EXISTS alembic_version;")
            await connection.execute(drop_alembic)

        migrations = self._configuration.database.migrations
        if migrations.exists():
            for content in migrations.iterdir():
                if content.is_file():
                    content.unlink()

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
