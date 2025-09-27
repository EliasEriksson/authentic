from __future__ import annotations

import contextlib
from functools import reduce
from typing import *
from uuid import UUID

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import InstrumentedAttribute, joinedload
from sqlalchemy.sql import ColumnExpressionArgument

from .... import schemas
from ... import models
from ..operator import Operator

if TYPE_CHECKING:
    from ..client import Client


class Sessions:
    _client: Client
    _operator: Operator

    def __init__(self, client: Client, operator: Operator) -> None:
        self._client = client
        self._operator = operator

    async def fetch_by_email(
        self, address: str, *, joins: Sequence[InstrumentedAttribute[Any]] | None = None
    ) -> models.Session:
        query = (
            select(models.Session)
            .where(models.Session.email_id == models.Email.id)
            .where(models.Email.address == address)
        )
        return await self._operator.fetch(query, joins=joins)

    async def fetch_by_key(
        self, email_id: UUID, joins: Sequence[InstrumentedAttribute[Any]] | None = None
    ) -> models.Session:
        query = select(models.Session).where(models.Session.email_id == email_id)
        return await self._operator.fetch(query, joins=joins)

    async def create(self, email_id: UUID) -> Tuple[models.Session, str]:
        async with self._operator.transaction() as session:
            model = models.Session(
                email_id=email_id,
                digest=models.Session.hash(
                    refresh_token := models.Session.generate_refresh_token()
                ),
            )
            session.add(model)
        return session, refresh_token

    async def delete_by_user_id(self, user_id: UUID) -> None:
        query = (
            delete(models.Session)
            .where(models.Email.user_id == user_id)
            .where(models.Email.id == models.Session.email_id)
        )
        async with self._operator.transaction() as session:
            session.execute(query)
