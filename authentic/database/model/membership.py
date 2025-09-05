from __future__ import annotations

from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..constants import CASCADE
from .model import Model

if TYPE_CHECKING:
    from .organization import Organization
    from .user import User


class MembershipProtocol(Protocol):
    organization_id: UUID | Mapped[UUID]
    user_id: UUID | Mapped[UUID]
    alias: str | None | Mapped[str | None]


class Membership(Model):
    __tablename__ = "membership"
    organization_id: Mapped[UUID] = mapped_column(
        ForeignKey("organization.id", ondelete=CASCADE),
        primary_key=True,
        nullable=False,
    )
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("user.id", ondelete=CASCADE),
        primary_key=True,
        nullable=False,
    )
    alias: Mapped[str | None] = mapped_column(
        Text(),
        nullable=False,
    )
    user: Mapped[User] = relationship(
        back_populates="memberships",
    )
    organization: Mapped[Organization] = relationship(
        back_populates="memberships",
    )
    __table_args__ = (UniqueConstraint(user_id, organization_id),)

    def update(self, membership: MembershipProtocol) -> Self:
        self.organization_id = membership.organization_id
        self.user_id = membership.user_id
        self.alias = membership.alias
        return self

    @classmethod
    def create(cls, membership: MembershipProtocol) -> Self:
        return cls().update(membership)
