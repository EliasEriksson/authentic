from __future__ import annotations

from typing import *

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Identifiable

if TYPE_CHECKING:
    from .subscription import Subscription


class Application(Identifiable):
    __tablename__ = "application"
    name: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    subscriptions: Mapped[List[Subscription]] = relationship(
        back_populates="application",
    )
