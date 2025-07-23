from __future__ import annotations

from typing import *

from sqlalchemy import CHAR, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..constants import CASCADE
from uuid import UUID
from .model import Identifiable

if TYPE_CHECKING:
    from .user import User


class PasswordProtocol(Protocol):
    user_id: UUID | Mapped[UUID]
    hash: str | Mapped[str]


class Password(Identifiable):
    __tablename__ = "password"
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("user.id", ondelete=CASCADE),
        nullable=False,
        primary_key=True,
    )
    hash: Mapped[str] = mapped_column(
        CHAR(),
        nullable=False,
    )
    user: Mapped[User] = relationship(
        back_populates="password",
    )

    def update(self, password: PasswordProtocol) -> Self:
        self.user_id = password.user_id
        self.hash = password.hash
        return self

    @classmethod
    def create(cls, password: PasswordProtocol) -> Self:
        return cls().update(password)
