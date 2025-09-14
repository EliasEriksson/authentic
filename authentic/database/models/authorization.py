from __future__ import annotations

from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..constants import CASCADE
from .base import Model

if TYPE_CHECKING:
    from .application import Application
    from .pkce_methods import PKCEMethod
    from .user import User


class Authorization(Model):
    __tablename__ = "authorization"
    application_id: Mapped[UUID] = mapped_column(
        ForeignKey("application.id", ondelete=CASCADE),
        primary_key=True,
        nullable=False,
    )
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("user.id", ondelete=CASCADE),
        primary_key=True,
        nullable=False,
    )
    pkce_method_id: Mapped[UUID] = mapped_column(
        ForeignKey("pkce_method.id", ondelete=CASCADE),
    )
    challenge: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    code: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    redirect: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    application: Mapped[Application] = relationship(
        back_populates="authorizations",
    )
    user: Mapped[User] = relationship(
        back_populates="authorizations",
    )
    pkce_method: Mapped[PKCEMethod] = relationship(
        back_populates="authorizations",
    )
    __table_args__ = (UniqueConstraint(application_id, user_id),)
