from __future__ import annotations

import msgspec


class Credentials(msgspec.Struct):
    __schema_name__ = "Credentials"
    email: str
    password: str
