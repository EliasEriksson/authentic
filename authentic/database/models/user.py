from __future__ import annotations

from typing import *

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Identifiable

if TYPE_CHECKING:
    from .authorization import Authorization
    from .email import Email
    from .membership import Membership
    from .password import Password
    from .password_resets import PasswordReset
    from .refresh_token import RefreshToken


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
    password: Mapped[Optional[Password]] = relationship(
        back_populates="user",
    )
    password_reset: Mapped[Optional[PasswordReset]] = relationship(
        back_populates="user",
    )
    refresh_tokens: Mapped[List[RefreshToken]] = relationship(
        back_populates="user",
    )
    authorizations: Mapped[List[Authorization]] = relationship(
        back_populates="user",
    )
