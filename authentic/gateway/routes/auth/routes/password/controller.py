from typing import *
from uuid import UUID

import litestar
from litestar import Request, Response
from litestar.exceptions.http_exceptions import ClientException, NotFoundException
from litestar.params import Parameter
from sqlalchemy.exc import IntegrityError, NoResultFound

from authentic import database, schemas


class Controller(litestar.Controller):
    @litestar.patch()
    async def patch(self, data: schemas.password.Change) -> Response[None]:
        return Response(None)
