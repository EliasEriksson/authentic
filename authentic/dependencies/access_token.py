from __future__ import annotations

from typing import *

from authentic import schemas
from litestar import Request
from litestar.params import Parameter


async def access_token(
    request: Request,
    authorization: Annotated[str, Parameter(header="Authorization")],
) -> schemas.AccessToken:
    # TODO add header util to handle authorization header
    return schemas.AccessToken.decode()
