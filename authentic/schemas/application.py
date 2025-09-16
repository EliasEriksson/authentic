from __future__ import annotations

from datetime import datetime
from typing import *
from uuid import UUID

import msgspec


class Mutable(msgspec.Struct):
    __schema_name__ = "ApplicationMutable"
    name: str
    open: bool


class Creatable(Mutable):
    __schema_name__ = "ApplicationCreatable"


class Listable(Mutable):
    __schema_name__ = "ApplicationListable"
    id: UUID
    created: datetime
    modified: datetime


class Application(Listable):
    __schema_name__ = "Application"
    subscribers: List[UUID]
