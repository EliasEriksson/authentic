from __future__ import annotations
from typing import *

from .access_token import AccessToken
from .client_token_response import ClientTokenResponseFields
from uuid import UUID


class Fields(ClientTokenResponseFields):
    refresh_token: str


class TokenResponse(Fields):
    __schema_name__ = "TokenResponse"

    @classmethod
    def create(
        cls, email_id: UUID, audience: str, issuer: str, refresh_token: str
    ) -> Self:
        return cls(
            access_token=AccessToken.create(email_id, audience, issuer).encode(),
            refresh_token=refresh_token,
        )
