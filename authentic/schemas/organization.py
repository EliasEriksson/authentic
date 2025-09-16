from __future__ import annotations

from datetime import datetime
from typing import *
from uuid import UUID

import msgspec


class Mutable(msgspec.Struct):
    __schema_name__ = "OrganizationMutable"
    name: str
    open: bool


class Creatable(Mutable):
    __schema_name__ = "OrganizationCreatable"


class Listable(Mutable):
    __schema_name__ = "OrganizationListable"
    id: UUID
    created: datetime
    modified: datetime


class Organization(Listable):
    __schema_name__ = "Organization"
    subscriptions: List[UUID]
    members: List[UUID]
