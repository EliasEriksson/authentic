from __future__ import annotations

from typing import *

from sqlalchemy import Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .model import Identifiable
from uuid import UUID

from ..constants import CASCADE

if TYPE_CHECKING:
    from .user import User


class EmailProtocol(Protocol):
    user_id: UUID | Mapped[UUID]
    address: str | Mapped[str]


class Email(Identifiable):
    __tablename__ = "email"
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("user.id", ondelete=CASCADE),
        nullable=False,
    )
    address: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    user: Mapped[User] = relationship(
        back_populates="emails",
    )

    def update(self, email: EmailProtocol) -> Self:
        self.user_id = email.user_id
        self.address = email.address
        return self

    @classmethod
    def create(cls, email: EmailProtocol) -> Self:
        return cls().update(email)
