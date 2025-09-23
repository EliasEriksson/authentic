from __future__ import annotations

import secrets
from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..constants import CASCADE
from .base import Model

if TYPE_CHECKING:
    from . import User


class PasswordReset(Model):
    __tablename__ = "password_reset"
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("user.id", ondelete=CASCADE),
        primary_key=True,
        nullable=False,
    )
    code: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )
    user: Mapped[User] = relationship(
        back_populates="password_reset",
    )

    @staticmethod
    def generate_code() -> str:
        return secrets.token_urlsafe(64)
