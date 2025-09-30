from typing import *

import litestar
from litestar import Request, Response
from litestar.datastructures.cookie import Cookie
from litestar.exceptions.http_exceptions import NotAuthorizedException
from sqlalchemy.exc import NoResultFound

from authentic import database, schemas


class Password(litestar.Controller):

    @litestar.put()
    async def put(
        self,
        database: database.Client,
        access_token: schemas.AccessToken,
        refresh_token: str,
        data: schemas.password.PasswordChange,
    ) -> Response[None]:
        # await database.passwords.change(data, access_token, refresh_token)
        return Response(None)

    @litestar.patch()
    async def patch(
        self,
        database: database.Client,
        request: Request,
        data: schemas.password.PasswordReset,
    ) -> Response[schemas.ClientTokenResponse]:
        # TODO: split database.passwords.reset into 2 functions
        #       endpoint optionally decodes JWT. if one provided -> try change if fail try reset else reset
        try:
            if not await database.passwords.reset(data):
                raise NotAuthorizedException()
        except NoResultFound as error:
            raise NotAuthorizedException() from error
        try:
            email = await database.emails.fetch_by_address(data.email)
        except NoResultFound as error:
            raise NotAuthorizedException() from error
        try:
            session, refresh_token = await database.sessions.create(email.id)
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
