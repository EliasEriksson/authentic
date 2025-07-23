from __future__ import annotations

from typing import *

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .model import Identifiable

if TYPE_CHECKING:
    from .membership import Membership
    from .subscription import Subscription
    from .refresh_token import RefreshToken
    from .authorization import Authorization


class OrganizationProtocol(Protocol):
    name: str | Mapped[str]


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
    authorizations: Mapped[List[Authorization]] = relationship(
        back_populates="organization",
    )
    refresh_tokens: Mapped[List[RefreshToken]] = relationship(
        back_populates="organization",
    )

    def update(self, organization: OrganizationProtocol) -> Self:
        self.name = organization.name
        return self

    @classmethod
    def create(cls, organization: OrganizationProtocol) -> Self:
        return cls().update(organization)
