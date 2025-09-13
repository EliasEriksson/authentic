from __future__ import annotations

from typing import *

from sqlalchemy import Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import false

from .base import Identifiable

if TYPE_CHECKING:
    from .identity import Identity
    from .subscription import Subscription


class Application(Identifiable):
    __tablename__ = "application"
    name: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    open: Mapped[bool] = mapped_column(
        Boolean(),
        server_default=false(),
        nullable=False,
    )
    subscribers: Mapped[List[Subscription]] = relationship(
        back_populates="application",
    )
    identity: Mapped[List[Identity]] = relationship(
        back_populates="application",
    )
