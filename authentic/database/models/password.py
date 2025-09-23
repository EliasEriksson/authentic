from __future__ import annotations

from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey, LargeBinary, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from authentic.utils import hash

from ..constants import CASCADE
from .base import Model

if TYPE_CHECKING:
    from . import User


class Password(Model):
    __tablename__ = "password"
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
        back_populates="password",
    )

    def verify(self, password: str) -> bool:
        return hash.verify_password(password, self.digest)

    @staticmethod
    def hash(password: str) -> bytes:
        return hash.password(password)
