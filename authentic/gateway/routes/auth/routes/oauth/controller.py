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
    async def authorize(self) -> Response[None]:
        return Response(None)

    @litestar.post()
    async def token(
        self, data: Annotated[dict, Body(media_type=RequestEncodingType.MULTI_PART)]
    ) -> Response[None]:
        return Response(None)
