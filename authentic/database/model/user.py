from __future__ import annotations

from typing import *

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Identifiable

if TYPE_CHECKING:
    from .membership import Membership


class User(Identifiable):
    __tablename__ = "user"
    name: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    memberships: Mapped[List[Membership]] = relationship(
        back_populates="user",
    )
