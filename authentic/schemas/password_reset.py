from __future__ import annotations

from datetime import datetime
from typing import *
from uuid import UUID

import msgspec


class PasswordReset(msgspec.Struct):
    __schema_name__ = "Subscription"
    email: str
