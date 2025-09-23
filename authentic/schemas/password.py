from __future__ import annotations

import msgspec


class ResetRequest(msgspec.Struct):
    __schema_name__ = "PasswordResetRequest"
    email: str


class Reset(ResetRequest):
    __schema_name__ = "PasswordChange"
    password: str
    new_password: str
