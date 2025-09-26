from __future__ import annotations

from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..constants import CASCADE
from .base import Identifiable

if TYPE_CHECKING:
    from .user import User
    from .session import Session


class Email(Identifiable):
    __tablename__ = "email"
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("user.id", ondelete=CASCADE),
        nullable=False,
    )
    address: Mapped[str] = mapped_column(Text(), nullable=False, unique=True)
    user: Mapped[User] = relationship(
        back_populates="emails",
    )
    sessions: Mapped[List[Session]] = relationship(
        back_populates="email",
    )
