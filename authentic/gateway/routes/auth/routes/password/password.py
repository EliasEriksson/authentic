import litestar
from litestar import Request, Response
from litestar.exceptions.http_exceptions import NotAuthorizedException
from sqlalchemy.exc import NoResultFound

from authentic import database, schemas


class Password(litestar.Controller):
    @litestar.patch()
    async def patch(
        self,
        request: Request,
        database: database.Client,
        data: schemas.password.Reset,
    ) -> Response[schemas.TokenResponse]:
        if not await database.passwords.reset(data):
            raise NotAuthorizedException()
        try:
            email = await database.emails.fetch_by_address(data.email)
        except NoResultFound:
            raise NotAuthorizedException()
        try:
            await database.sessions.create(email.id)
        except NoResultFound:
            raise NotAuthorizedException()
        token_response = schemas.token_response.TokenResponse(
            access_token=schemas.AccessToken.create(
                email.id, request.url.hostname, request.url.hostname
            ).encode(),
            refresh_token="",
        )
        return Response(token_response)
