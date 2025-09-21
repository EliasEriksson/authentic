from __future__ import annotations

from typing import *
from uuid import UUID

from bcrypt import checkpw
from sqlalchemy import ForeignKey, LargeBinary, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from authentic.utils import hash

from ..constants import CASCADE
from .base import Identifiable

if TYPE_CHECKING:
    from . import User


class Password(Identifiable):
    __tablename__ = "password"
    digest: Mapped[bytes] = mapped_column(
        LargeBinary(),
        nullable=False,
    )
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("user.id", ondelete=CASCADE),
        nullable=True,
    )
    user: Mapped[User] = relationship(
        back_populates="password",
    )
    __table_args__ = (UniqueConstraint("id", user_id),)

    def verify(self, password: str) -> bool:
        return checkpw(password.encode(), self.digest)

    @staticmethod
    def hash(password: str) -> bytes:
        return hash.password(password)
