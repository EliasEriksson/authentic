from typing import *
from uuid import UUID

import litestar
from litestar import Request, Response
from litestar.enums import RequestEncodingType
from litestar.exceptions.http_exceptions import ClientException, NotFoundException
from litestar.params import Body, Parameter
from sqlalchemy.exc import IntegrityError, NoResultFound

from authentic import database, schemas


class Controller(litestar.Controller):
    @litestar.get()
    async def create(self) -> Response[None]:
        return Response(None)
