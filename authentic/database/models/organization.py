from __future__ import annotations

from typing import *

from sqlalchemy import Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import false

from .base import Identifiable

if TYPE_CHECKING:
    from .membership import Membership
    from .subscription import Subscription


class Organization(Identifiable):
    __tablename__ = "organization"
    name: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    open: Mapped[bool] = mapped_column(
        Boolean(),
        server_default=false(),
        nullable=False,
    )
    subscriptions: Mapped[List[Subscription]] = relationship(
        back_populates="organization",
    )
    members: Mapped[List[Membership]] = relationship(
        back_populates="organization",
    )
