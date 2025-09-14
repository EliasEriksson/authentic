from typing import *
from uuid import UUID

import litestar
from litestar import Request, Response
from litestar.exceptions.http_exceptions import ClientException, NotFoundException
from litestar.params import Parameter

from authentic import database, schemas


class Controller(litestar.Controller):
    @litestar.get()
    async def list(self, database: database.Client) -> List[schemas.User]:
        users = await database.users.list()
        return [schemas.User.from_model(user) for user in users]

    @litestar.post()
    async def create(
        self, database: database.Client, data: schemas.user.Creatable
    ) -> schemas.User:
        user = await database.users.create(data)
        return schemas.User.from_model(user)
