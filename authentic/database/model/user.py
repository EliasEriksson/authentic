from __future__ import annotations

from typing import *

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .model import Identifiable

if TYPE_CHECKING:
    from .membership import Membership
    from .refresh_token import RefreshToken
    from .password import Password
    from .email import Email


class UserProtocol(Protocol):
    name: str | Mapped[str]


class User(Identifiable):
    __tablename__ = "user"
    name: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    memberships: Mapped[List[Membership]] = relationship(
        back_populates="user",
    )
    refresh_tokens: Mapped[List[RefreshToken]] = relationship(
        back_populates="user",
    )
    password: Mapped[Password | None] = relationship(
        back_populates="user",
    )
    emails: Mapped[List[Email]] = relationship(
        back_populates="user",
    )

    def update(self, user: UserProtocol) -> Self:
        self.name = user.name
        return self

    @classmethod
    def create(cls, user: UserProtocol) -> Self:
        return cls().update(user)
