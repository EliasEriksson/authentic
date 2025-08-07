from __future__ import annotations

from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..constants import CASCADE
from .model import Model

if TYPE_CHECKING:
    from .application import Application
    from .organization import Organization
    from .user import User


class RefreshTokenProtocol(Protocol):
    application_id: UUID | Mapped[UUID]
    organization_id: UUID | Mapped[UUID]
    user_id: UUID | Mapped[UUID]
    code: str | Mapped[str]


class RefreshToken(Model):
    __tablename__ = "refresh_token"
    application_id: Mapped[UUID] = mapped_column(
        ForeignKey("application.id", ondelete=CASCADE),
        primary_key=True,
        nullable=False,
    )
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
    code: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
        index=True,
    )
    application: Mapped[Application] = relationship(
        back_populates="refresh_tokens",
    )
    organization: Mapped[Organization] = relationship(
        back_populates="refresh_tokens",
    )
    user: Mapped[User] = relationship(
        back_populates="refresh_tokens",
    )
    __table_args__ = (UniqueConstraint(application_id, organization_id, user_id),)

    def update(self, refresh_token: RefreshTokenProtocol) -> Self:
        self.application_id = refresh_token.application_id
        self.organization_id = refresh_token.organization_id
        self.user_id = refresh_token.user_id
        self.code = refresh_token.code
        return self

    @classmethod
    def create(cls, refresh_token: RefreshTokenProtocol) -> Self:
        return cls().update(refresh_token)
