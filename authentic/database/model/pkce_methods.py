from __future__ import annotations

from typing import *

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .model import Identifiable

if TYPE_CHECKING:
    from .authorization import Authorization


class PKCEMethodProtocol(Protocol):
    name: str | Mapped[str]


class PKCEMethod(Identifiable):
    __tablename__ = "pkce_method"
    name: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    authorizations: Mapped[List[Authorization]] = relationship(
        back_populates="pkce_method",
    )

    def update(self, pkce_method: PKCEMethodProtocol) -> Self:
        self.name = pkce_method.name
        return self

    @classmethod
    def create(cls, pkce_method: PKCEMethodProtocol) -> Self:
        return cls().update(pkce_method)
