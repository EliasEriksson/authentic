from __future__ import annotations

from typing import *

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Identifiable

if TYPE_CHECKING:
    from .authorization import Authorization


class PKCEMethod(Identifiable):
    __tablename__ = "pkce_method"
    name: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    authorizations: Mapped[List[Authorization]] = relationship(
        back_populates="pkce_method",
    )
