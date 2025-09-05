from __future__ import annotations
from typing import *

from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import asyncio

from ... import models
from .... import schemas


class Users:
    _reader: AsyncSession
    _writer: AsyncSession

    def __init__(self, reader: AsyncSession, writer: AsyncSession) -> None:
        self._reader = reader
        self._writer = writer

    async def list(self, limit: int | None = None, offset: int | None = None):
        query = select(models.User).limit(limit).offset(offset)
        result = await self._reader.execute(query)
        return await asyncio.gather(
            *[
                asyncio.create_task(self._writer.merge(user, load=False))
                for user in result.scalars().all()
            ]
        )

    async def fetch_by_key(self, id: UUID) -> models.User | None:
        query = select(models.User).where(models.User.id == id)
        result = await self._reader.execute(query)
        return await self._writer.merge(result.scalars().first(), load=False)

    async def create(self, schema: schemas.user.Creatable) -> models.User:
        async with self._writer.begin():
            user = models.User(name=schema.name)
            self._writer.add(user)
        return user
