from __future__ import annotations

import contextlib
from functools import reduce
from typing import *
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import InstrumentedAttribute, joinedload
from sqlalchemy.sql import ColumnExpressionArgument

from .... import schemas
from ... import models
from ..operator import Operator

if TYPE_CHECKING:
    from ..client import Client


class Emails:
    _client: Client
    _operator: Operator

    def __init__(self, client: Client, operator: Operator) -> None:
        self._client = client
        self._operator = operator

    async def fetch_by_address(
        self,
        address: str,
        *,
        joins: Iterable[Sequence[InstrumentedAttribute[Any]]] | None = None,
    ) -> models.Email:
        query = select(models.Email).where(models.Email.address == address)
        return await self._operator.fetch(query, joins=joins)

    async def fetch_by_key(
        self,
        id: UUID,
        joins: Iterable[Sequence[InstrumentedAttribute[Any]]] | None = None,
    ) -> models.Email:
        query = select(models.Email).where(models.Email.id == id)
        return await self._operator.fetch(query, joins=joins)

    async def create(self, user_id: UUID, address: str) -> models.Email:
        async with self._operator.transaction() as session:
            email = models.Email(user_id=user_id, address=address)
            session.add(email)
        return email
