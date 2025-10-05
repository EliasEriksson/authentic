from litestar.datastructures.cookie import Cookie
from authentic.database import models


def refresh_token(session: models.Session, refresh_token: str) -> Cookie:
    return Cookie(
        key="refresh_token",
        value=refresh_token,
        samesite="strict",
        httponly=True,
        max_age=int(session.expires.timestamp()),
    )
