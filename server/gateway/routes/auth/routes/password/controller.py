import asyncio
from typing import *

import litestar
from litestar import Request, Response
from litestar.exceptions.http_exceptions import NotAuthorizedException
from sqlalchemy.exc import NoResultFound

from server import database, schemas, cookies
from server.database import models


class Controller(litestar.Controller):
    @litestar.put()
    async def replace(
        self,
        request: Request,
        database: database.Client,
        access_token: schemas.AccessToken,
        refresh_token: str,
        data: schemas.password.PasswordChange,
    ) -> Response[schemas.ClientTokenResponse]:
        try:
            session = await database.sessions.fetch_by_refresh_token(
                refresh_token,
                joins=[[models.Session.email, models.Email.user, models.User.password]],
            )
        except NoResultFound:
            raise NotAuthorizedException()
        if not (email := session.email).id == access_token.subject:
            raise NotAuthorizedException()
        if not email.user.password.verify(data.password):
            raise NotAuthorizedException()
        async with database.transaction():
            email.user.password.digest = models.Password.hash(data.password)
            await database.sessions.delete_by_user_id(email.user.id)
            created_session = await database.sessions.create(email)
        token_response = schemas.ClientTokenResponse(
            access_token=schemas.AccessToken.create(
                access_token.subject, request.url.hostname, request.url.hostname
            ).encode()
        )
        return Response(
            token_response,
            cookies=[cookies.refresh_token(*created_session)],
        )

    @litestar.patch()
    async def update(
        self,
        database: database.Client,
        request: Request,
        data: schemas.password.PasswordReset,
    ) -> Response[schemas.ClientTokenResponse]:
        try:
            email = await database.emails.fetch_by_address(
                data.email,
                joins=[
                    [models.Email.user, models.User.password_reset],
                    [models.Email.user, models.User.password],
                ],
            )
        except NoResultFound as error:
            raise NotAuthorizedException() from error
        if not email.user.password_reset or not email.user.password_reset.verify(
            data.code
        ):
            raise NotAuthorizedException()
        async with database.transaction():
            await database.passwords.create(email.user, data.password)
            await database.password_reset.delete_by_user_id(email.user.id)
            await database.sessions.delete_by_user_id(email.user.id)
            created_session = await database.sessions.create(email)
        client_token_response = schemas.ClientTokenResponse.create(
            email.id, request.url.hostname, request.url.hostname
        )
        return Response(
            client_token_response,
            cookies=[cookies.refresh_token(*created_session)],
        )
