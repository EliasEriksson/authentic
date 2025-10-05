from __future__ import annotations

from datetime import datetime
from typing import *
from uuid import UUID

import msgspec


class Mutable(msgspec.Struct):
    __schema_name__ = "MembershipMutable"


class Membership(Mutable):
    __schema_name__ = "Membership"
    organization: UUID
    user: UUID
    invitation: bool
    request: bool
    created: datetime
    modified: datetime
