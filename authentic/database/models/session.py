from __future__ import annotations

import secrets
from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey, LargeBinary, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from authentic.utils import hashing

from ..constants import CASCADE
from .base import Identifiable

if TYPE_CHECKING:
    from . import Email


class Session(Identifiable):
    __tablename__ = "session"
    email_id: Mapped[UUID] = mapped_column(
        ForeignKey("email.id", ondelete=CASCADE),
        primary_key=True,
        nullable=False,
    )
    digest: Mapped[bytes] = mapped_column(
        LargeBinary(),
        nullable=False,
    )
    email: Mapped[Email] = relationship(
        back_populates="sessions",
    )

    def verify(self, refresh_token: str) -> bool:
        return hashing.verify_hash(refresh_token, self.digest)

    @staticmethod
    def hash(refresh_token: str) -> bytes:
        return hashing.hash(refresh_token)

    @staticmethod
    def generate_refresh_token() -> str:
        return secrets.token_urlsafe(64)
