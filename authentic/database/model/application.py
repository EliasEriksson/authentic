from __future__ import annotations

from typing import *

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .model import Identifiable

if TYPE_CHECKING:
    from .subscription import Subscription
    from .refresh_token import RefreshToken


class ApplicationProtocol(Protocol):
    name: str | Mapped[str]


class Application(Identifiable):
    __tablename__ = "application"
    name: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    subscriptions: Mapped[List[Subscription]] = relationship(
        back_populates="application",
    )
    refresh_tokens: Mapped[List[RefreshToken]] = relationship(
        back_populates="application",
    )

    def update(self, application: ApplicationProtocol) -> Self:
        self.name = application.name
        return self

    @classmethod
    def create(cls, application: ApplicationProtocol) -> Self:
        return cls().update(application)
