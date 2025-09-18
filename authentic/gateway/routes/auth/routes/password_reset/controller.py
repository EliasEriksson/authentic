from typing import *
from uuid import UUID

import litestar
from litestar import Request, Response
from litestar.exceptions.http_exceptions import ClientException, NotFoundException
from litestar.params import Parameter
from sqlalchemy.exc import IntegrityError, NoResultFound

from authentic import database, schemas


class Controller(litestar.Controller):
    @litestar.post()
    async def create(self, data: schemas.password.ResetRequest) -> Response[None]:
        return Response(None)

    @litestar.patch()
    async def patch(self, data: schemas.password.Reset) -> Response[None]:
        return Response(None)
