from __future__ import annotations
from typing import *
from ..database import models
import msgspec
import secrets


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
