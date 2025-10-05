from __future__ import annotations

from datetime import datetime
from typing import *
from uuid import UUID

import msgspec


class Mutable(msgspec.Struct):
    __schema_name__ = "SubscriptionMutable"


class Subscription(Mutable):
    __schema_name__ = "Subscription"
    application: UUID
    organization: UUID
    invitation: bool
    request: bool
    created: datetime
    modified: datetime
