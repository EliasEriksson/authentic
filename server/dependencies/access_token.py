from __future__ import annotations

from typing import *

from server import schemas
from server.utils import http
from litestar import Request
from litestar.params import Parameter


async def access_token(
    request: Request,
    authorization: Annotated[str, Parameter(header="Authorization")],
) -> schemas.AccessToken:
    token = http.Headers.Authorization.from_bearer(authorization)
    return schemas.AccessToken.decode(token, request.url.hostname)
