import litestar
from litestar import Response
from litestar.exceptions.http_exceptions import NotAuthorizedException

from authentic import database, schemas


class Password(litestar.Controller):
    @litestar.patch()
    async def patch(
        self,
        database: database.Client,
        data: schemas.password.Reset,
    ) -> Response[None]:
        if not await database.passwords.reset(data):
            raise NotAuthorizedException()
        return Response(None)
