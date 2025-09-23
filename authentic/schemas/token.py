from __future__ import annotations

import secrets
from typing import *

import msgspec

from ..database import models


class Token(msgspec.Struct):
    __schema_name__ = "Token"
    access: str
    refresh: str

    @classmethod
    def create(cls, user: models.User) -> Self:
        return cls(
            access=str(user.id),
            refresh=secrets.token_urlsafe(64),
        )
