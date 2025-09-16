from __future__ import annotations

from datetime import datetime
from typing import *
from uuid import UUID

import msgspec


class Credentials:
    __schema_name__ = "Credentials"
    email: str
    password: str


class CredentialsReset(Credentials):
    __schema_name__ = "CredentialsReset"
    code: str


class CredentialsSet(Credentials):
    __schema_name__ = "CredentialsSet"
    old: str
