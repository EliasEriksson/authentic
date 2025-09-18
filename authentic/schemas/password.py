from __future__ import annotations

import msgspec


class ResetRequest(msgspec.Struct):
    __schema_name__ = "PasswordResetRequest"
    email: str


class Reset(ResetRequest):
    __schema_name__ = "PasswordReset"
    code: str
    password: str


class Change(msgspec.Struct):
    __schema_name__ = "PasswordChange"
    old: str
    password: str
