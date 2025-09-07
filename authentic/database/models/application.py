from __future__ import annotations

from typing import *

from sqlalchemy import Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship, backref
from sqlalchemy.sql import false

from .base import Identifiable

if TYPE_CHECKING:
    from .subscription import Subscription
    from .identity import Identity


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
    identity: Mapped[List[Identity]] = mapped_column(
        back_populates="application",
    )
