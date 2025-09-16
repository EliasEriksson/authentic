from __future__ import annotations

from datetime import datetime
from typing import *
from uuid import UUID

import msgspec

from authentic.database import models


class Mutable(msgspec.Struct):
    __schema_name__ = "UserMutable"
    name: str


class Creatable(Mutable):
    __schema_name__ = "UserCreatable"
    email: str


class Listable(Mutable):
    __schema_name__ = "UserListable"
    id: UUID
    created: datetime
    modified: datetime


class User(Mutable):
    __schema_name__ = "User"
    id: UUID
    emails: List[UUID]
    memberships: List[UUID]

    @classmethod
    def from_model(cls, user: models.User) -> Self:
        return cls(
            id=user.id,
            name=user.name,
            emails=[email.id for email in user.emails],
            memberships=[membership.organization_id for membership in user.memberships],
        )
