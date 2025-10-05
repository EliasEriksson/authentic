from typing import *
from uuid import UUID

import litestar
from litestar import Request, Response
from litestar.exceptions.http_exceptions import ClientException, NotFoundException
from litestar.params import Parameter
from sqlalchemy.exc import IntegrityError, NoResultFound

from server import database, schemas
from server.services.email import Email


class Controller(litestar.Controller):
    @litestar.post()
    async def create(
        self,
        database: database.Client,
        data: schemas.password.PasswordResetRequest,
        email: Email,
    ) -> Response[None]:
        try:
            user = await database.users.fetch_by_email(data.email)
        except NoResultFound:
            return Response(None)
        password_reset, code = await database.password_reset.create(user)
        await email.send_text(data.email, "Password reset", f"reset code: '{code}'")
        return Response(None)
