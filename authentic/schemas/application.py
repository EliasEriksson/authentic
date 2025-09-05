from __future__ import annotations

from datetime import datetime
from typing import *
from uuid import UUID

import msgspec


class Mutable(msgspec.Struct):
    name: str
    open: bool


class Listable(Mutable):
    id: UUID
    created: datetime
    modified: datetime


class Application(Listable):
    subscribers: List[UUID]
