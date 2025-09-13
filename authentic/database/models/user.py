from __future__ import annotations

from typing import *

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Identifiable

if TYPE_CHECKING:
    from .email import Email
    from .membership import Membership
    from .password import Password


class User(Identifiable):
    __tablename__ = "user"
    name: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    emails: Mapped[List[Email]] = relationship(
        back_populates="user",
    )
    memberships: Mapped[List[Membership]] = relationship(
        back_populates="user",
    )
    passwords: Mapped[List[Password]] = relationship(
        back_populates="user",
    )
