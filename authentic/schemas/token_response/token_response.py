from __future__ import annotations

import msgspec


class TokenResponse(msgspec.Struct):
    __schema_name__ = "Token"
    access_token: str
    refresh_token: str
