from __future__ import annotations

import msgspec


class PasswordResetRequest(msgspec.Struct):
    __schema_name__ = "PasswordResetRequest"
    email: str


class PasswordChange(msgspec.Struct):
    __schema_name__ = "PasswordChange"
    password: str


class PasswordReset(PasswordResetRequest):
    __schema_name__ = "PasswordChange"
    code: str
    password: str
