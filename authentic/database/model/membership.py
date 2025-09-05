from __future__ import annotations

from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..constants import CASCADE
from .base import Model

if TYPE_CHECKING:
    from .organization import Organization
    from .user import User


class Membership(Model):
    __tablename__ = "membership"
    organization_id: Mapped[UUID] = mapped_column(
        ForeignKey(Organization.id, ondelete=CASCADE),
        primary_key=True,
        nullable=False,
    )
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey(User.id, ondelete=CASCADE),
        primary_key=True,
        nullable=False,
    )
    user: Mapped[User] = relationship(
        back_populates="memberships",
    )
    organization: Mapped[Organization] = relationship(
        back_populates="memberships",
    )
    __table_args__ = (UniqueConstraint(user_id, organization_id),)
