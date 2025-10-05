from __future__ import annotations
from typing import *

import msgspec
from uuid import UUID
from .access_token import AccessToken


class ClientTokenResponseFields(msgspec.Struct):
    access_token: str


class ClientTokenResponse(ClientTokenResponseFields):
    __schema_name__ = "ClientTokenResponse"

    @classmethod
    def create(cls, email_id: UUID, audience: str, issuer: str, *_, **__) -> Self:
        return cls(
            access_token=AccessToken.create(email_id, audience, issuer).encode(),
        )
