from __future__ import annotations

import contextlib
from typing import *
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession

from .... import schemas
from ... import models
from ..operator import Operator

if TYPE_CHECKING:
    from ..client import Client


class Passwords:
    _client: Client
    _operator: Operator

    def __init__(self, client: Client, operator: Operator) -> None:
        self._client = client
        self._operator = operator

    async def fetch_by_user_id(self, user_id: UUID) -> models.Password:
        query = select(models.Password).where(models.Password.user_id == user_id)
        return await self._operator.fetch(query)

    async def fetch_by_email(self, email: str) -> models.Password:
        query = (
            select(models.Password)
            .where(models.Email.user_id == models.Password.user_id)
            .where(models.Email.address == email)
        )
        return await self._operator.fetch(query)

    async def change(
        self,
        data: schemas.password.PasswordChange,
        access_token: schemas.AccessToken,
        refresh_token: str,
    ) -> bool:
        print("asd")
        session = await self._client.sessions.fetch_by_key(
            access_token.subject,
            joins=[[models.Session.email, models.Email.user, models.User.password]],
        )
        if session.verify(refresh_token):
            print("false 1", refresh_token)
            return False
        if not session.email.user.password.verify(data.password):
            print("false 2")
            return False
        async with self._operator.transaction() as database_session:
            session.email.user.password.digest = session.email.user.password.hash(
                data.password
            )
            # TODO why are these old sessiosn not deleted?
            await database_session.delete(session)
            print(database_session.deleted)
            await self._client.sessions.delete_by_user_id(session.email.user.id)
        return True

    async def reset(self, data: schemas.password.PasswordReset) -> bool:
        user = await self._client.users.fetch_by_email(
            data.email, joins=[[models.User.password_reset]]
        )
        if not user.password_reset or not user.password_reset.verify(data.code):
            return False
        async with self._operator.transaction() as session:
            digest = models.Password.hash(data.password)
            try:
                password = await self._client.passwords.fetch_by_user_id(user.id)
                password.digest = digest
            except NoResultFound:
                password = models.Password(user_id=user.id, digest=digest)
            session.add(password)
            password.digest = digest
            # await self._client.password_reset.delete_by_user_id(user.id)
            await self._client.sessions.delete_by_user_id(user.id)
        return True

    @contextlib.asynccontextmanager
    async def transaction(self) -> AsyncIterable[AsyncSession]:
        async with self._operator.transaction() as session:
            yield session
