from typing import *

import litestar
from litestar import Request, Response
from litestar.datastructures.cookie import Cookie
from litestar.exceptions.http_exceptions import NotAuthorizedException
from sqlalchemy.exc import NoResultFound

from authentic import database, schemas
from authentic.database import models


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
            session = await database.sessions.fetch_by_email_id(
                access_token.subject,
                joins=[[models.Session.email, models.Email.user, models.User.password]],
            )
        except NoResultFound:
            raise NotAuthorizedException()
        if not session.verify(refresh_token):
            raise NotAuthorizedException()
        if not session.email.user.password.verify(data.password):
            raise NotAuthorizedException()
        async with database.transaction():
            session.email.user.password.digest = models.Password.hash(data.password)
            await database.sessions.delete_by_user_id(session.email.user.id)
        async with database.transaction():
            session, refresh_token = await database.sessions.create(session.email)
            await database.sessions.delete_by_user_id(session.email.user.id)
        token_response = schemas.ClientTokenResponse(
            access_token=schemas.AccessToken.create(
                access_token.subject, request.url.hostname, request.url.hostname
            ).encode()
        )
        return Response(
            token_response,
            cookies=[
                Cookie(
                    key="refresh_token",
                    value=refresh_token,
                    samesite="strict",
                    httponly=True,
                    max_age=int(session.expires.timestamp()),
                )
            ],
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
        try:
            session, refresh_token = await database.sessions.create(email)
        except NoResultFound as error:
            raise NotAuthorizedException() from error
        token_response = schemas.token_response.ClientTokenResponse(
            access_token=schemas.AccessToken.create(
                email.id, request.url.hostname, request.url.hostname
            ).encode(),
        )
        return Response(
            token_response,
            cookies=[
                Cookie(
                    key="refresh_token",
                    value=refresh_token,
                    samesite="strict",
                    httponly=True,
                    max_age=int(session.expires.timestamp()),
                ),
            ],
        )
