from typing import *
from uuid import UUID

import litestar
from litestar import Request, Response
from litestar.exceptions.http_exceptions import (
    ClientException,
    NotFoundException,
    NotAuthorizedException,
)
from litestar.params import Body, Parameter
from sqlalchemy.exc import IntegrityError, NoResultFound

from authentic import database, schemas, cookies
from authentic.database import models


class Controller(litestar.Controller):
    @litestar.post()
    async def create(
        self,
        request: Request,
        database: database.Client,
        data: schemas.Credentials,
    ) -> Response[schemas.ClientTokenResponse]:
        try:
            email = await database.emails.fetch_by_address(
                data.email,
                joins=[[models.Email.user, models.User.password]],
            )
        except NoResultFound as error:
            raise NotAuthorizedException() from error
        if not email.user.password.verify(data.password):
            raise NotAuthorizedException()
        created = await database.sessions.create(email)
        client_token_response = schemas.ClientTokenResponse.create(
            email.id, request.url.hostname, request.url.hostname
        )
        return Response(
            client_token_response,
            cookies=[cookies.refresh_token(*created)],
        )

    @litestar.patch()
    async def update(
        self, request: Request, database: database.Client, refresh_token: str
    ) -> Response[schemas.ClientTokenResponse]:
        try:
            current_session = await database.sessions.fetch_by_refresh_token(
                refresh_token,
                joins=[[models.Session.email]],
            )
        except NoResultFound as error:
            raise NotAuthorizedException() from error
        async with database.transaction() as transaction:
            created = await database.sessions.create(email := current_session.email)
            await transaction.delete(current_session)
        client_token_response = schemas.ClientTokenResponse.create(
            email.id, request.url.hostname, request.url.hostname
        )
        return Response(
            client_token_response,
            cookies=[cookies.refresh_token(*created)],
        )

    @litestar.delete()
    async def delete(
        self, database: database.Client, refresh_token: str
    ) -> Response[None]:
        try:
            current_session = await database.sessions.fetch_by_refresh_token(
                refresh_token
            )
        except NoResultFound as error:
            raise NotAuthorizedException() from error

        async with database.transaction() as transaction:
            await transaction.delete(current_session)
        return Response(None)
