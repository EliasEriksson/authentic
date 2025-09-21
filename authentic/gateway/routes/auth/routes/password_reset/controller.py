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
    async def create(
        self, database: database.Client, data: schemas.password.ResetRequest
    ) -> Response[None]:
        password_reset = await database.password_reset.create(data)
        print(password_reset.code)
        return Response(None)
