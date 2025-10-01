from __future__ import annotations

import secrets
from datetime import UTC, datetime, timedelta
from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey, LargeBinary
from sqlalchemy.orm import Mapped, mapped_column, relationship

from authentic.utils import hashing

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
    digest: Mapped[bytes] = mapped_column(
        LargeBinary(),
        nullable=False,
    )
    user: Mapped[User] = relationship(
        back_populates="password_reset",
    )

    def verify(self, code: str) -> bool:
        return hashing.verify_salted_hash(code, self.digest) and datetime.now(UTC) < (
            self.created + timedelta(hours=1)
        )

    @staticmethod
    def hash(code: str) -> bytes:
        return hashing.salted_hash(code)

    @staticmethod
    def generate_code() -> str:
        return secrets.token_urlsafe(64)
