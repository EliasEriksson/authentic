from typing import *
from uuid import UUID

import litestar
from litestar import Request, Response
from litestar.exceptions.http_exceptions import ClientException, NotFoundException
from litestar.params import Parameter
from sqlalchemy.exc import IntegrityError, NoResultFound

from authentic import database, schemas
from authentic.services.email import Email


class Controller(litestar.Controller):
    @litestar.post()
    async def create(
        self,
        database: database.Client,
        data: schemas.password.PasswordResetRequest,
        email: Email,
    ) -> Response[None]:
        try:
            code = await database.password_reset.create(data)
        except NoResultFound:
            return Response(None)
        await email.send_text(data.email, "Password reset", f"reset code: '{code}'")
        return Response(None)
