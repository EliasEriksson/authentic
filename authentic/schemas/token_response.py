from __future__ import annotations

from .client_token_response import ClientTokenResponse


class TokenResponse(ClientTokenResponse):
    __schema_name__ = "TokenResponse"
    refresh_token: str
