from typing import *
from uuid import UUID

import litestar
from litestar import Request, Response
from litestar.exceptions.http_exceptions import ClientException, NotFoundException
from litestar.params import Parameter
from sqlalchemy.exc import IntegrityError, NoResultFound

from authentic import database, schemas
from authentic.services.email import Email


class PasswordReset(litestar.Controller):
    @litestar.post()
    async def create(
        self,
        database: database.Client,
        data: schemas.password.ResetRequest,
        email: Email,
    ) -> Response[None]:
        password_reset = await database.password_reset.create(data)
        await email.send_text(
            data.email, "Password reset", f"reset code: '{password_reset.code}'"
        )
        return Response(None)
