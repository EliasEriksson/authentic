from typing import *
from uuid import UUID

import litestar
from litestar import Request, Response
from litestar.exceptions.http_exceptions import ClientException, NotFoundException
from litestar.params import Parameter
from sqlalchemy.exc import IntegrityError, NoResultFound

from authentic import database, schemas


class Controller(litestar.Controller):
    @litestar.get()
    async def list(
        self,
        database: database.Client,
        limit: Annotated[int, Parameter(query="limit")] = 10,
        offset: Annotated[int, Parameter(query="offset")] = 0,
    ) -> Response[List[schemas.User]]:
        users = await database.users.list(limit, offset)
        return Response([schemas.User.from_model(user) for user in users])

    @litestar.get("/{id:uuid}")
    async def fetch(
        self, database: database.Client, id: UUID
    ) -> Response[schemas.User]:
        try:
            user = await database.users.fetch_by_key(id)
        except NoResultFound:
            raise NotFoundException("No such user.")
        return Response(schemas.User.from_model(user))

    @litestar.post()
    async def create(
        self, database: database.Client, data: schemas.user.Creatable
    ) -> Response[schemas.User]:
        try:
            user = await database.users.create(data)
        except IntegrityError:
            raise ClientException("Email already in use.")
        return Response(schemas.User.from_model(user))
