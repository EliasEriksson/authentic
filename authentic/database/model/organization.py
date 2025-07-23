from __future__ import annotations

from typing import *

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

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
    subscriptions: Mapped[List[Subscription]] = relationship(
        back_populates="organization",
    )
    memberships: Mapped[List[Membership]] = relationship(
        back_populates="organization",
    )
