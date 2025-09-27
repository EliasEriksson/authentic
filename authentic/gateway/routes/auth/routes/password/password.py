from typing import *

import litestar
from litestar import Request, Response
from litestar.datastructures.cookie import Cookie
from litestar.exceptions.http_exceptions import NotAuthorizedException
from litestar.params import Parameter
from sqlalchemy.exc import NoResultFound

from authentic import database, schemas


class Password(litestar.Controller):
    @litestar.patch()
    async def patch(
        self,
        database: database.Client,
        request: Request,
        refresh_token: Annotated[str | None, Parameter(cookie="refresh_token")],
        data: schemas.password.Reset,
    ) -> Response[schemas.ClientTokenResponse]:
        # TODO: split database.passwords.reset into 2 functions
        #       endpoint optionally decodes JWT. if one provided -> try change if fail try reset else reset
        try:
            if not await database.passwords.reset(data, refresh_token=refresh_token):
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
