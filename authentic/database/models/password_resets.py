from __future__ import annotations

from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..constants import CASCADE
from .base import Identifiable

if TYPE_CHECKING:
    from . import User


class PasswordReset(Identifiable):
    __tablename__ = "password_reset"
    code: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("user.id", ondelete=CASCADE),
        nullable=False,
    )
    user: Mapped[User] = relationship(
        back_populates="password_reset",
    )
    __table_args__ = (UniqueConstraint("id", user_id),)
