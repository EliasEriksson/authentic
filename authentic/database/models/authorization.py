from __future__ import annotations

from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..constants import CASCADE
from .model import Model

if TYPE_CHECKING:
    from .application import Application
    from .organization import Organization
    from .pkce_method import PKCEMethod
    from .user import User


class AuthorizationProtocol(Protocol):
    application_id: UUID | Mapped[UUID]
    organization_id: UUID | Mapped[UUID]
    user_id: UUID | Mapped[UUID]
    pkce_method_id: UUID | Mapped[PKCEMethod]
    challenge: str | Mapped[str]
    code: str | Mapped[str]
    redirect: str | Mapped[str]


class Authorization(Model):
    __tablename__ = "authorization"
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
    pkce_method_id: Mapped[PKCEMethod] = mapped_column(
        ForeignKey("pkce_method.id", ondelete=CASCADE),
        nullable=False,
    )
    challenge: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    code: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
        index=True,
    )
    redirect: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    application: Mapped[Application] = relationship(
        back_populates="authorizations",
    )
    organization: Mapped[Organization] = relationship(
        back_populates="authorizations",
    )
    user: Mapped[User] = relationship(
        back_populates="authorizations",
    )
    pkce_method: Mapped[PKCEMethod] = relationship(
        back_populates="authorizations",
    )
    __table_args__ = (
        UniqueConstraint(application_id, user_id),
        UniqueConstraint(code),
    )

    def update(self, authorization: AuthorizationProtocol) -> Self:
        self.application_id = authorization.application_id
        self.organization_id = authorization.organization_id
        self.user_id = authorization.user_id
        self.pkce_method_id = authorization.pkce_method_id
        self.challenge = authorization.challenge
        self.code = authorization.code
        self.redirect = authorization.redirect
        return self

    @classmethod
    def create(cls, authorization: AuthorizationProtocol) -> Self:
        return cls().update(authorization)
