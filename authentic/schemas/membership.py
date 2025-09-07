from __future__ import annotations

from datetime import datetime
from typing import *
from uuid import UUID

import msgspec


class Mutable(msgspec.Struct): ...


class Membership(Mutable):
    organization: UUID
    user: UUID
    invitation: bool
    request: bool
    created: datetime
    modified: datetime
