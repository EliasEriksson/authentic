from typing import *
from litestar.params import Parameter


async def refresh_token(
    token: Annotated[str, Parameter(cookie="refresh_token")],
) -> str:
    return token
