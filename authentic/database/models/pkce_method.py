from __future__ import annotations
from typing import *
from types import SimpleNamespace
from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .model import Identifiable


if TYPE_CHECKING:
    from .authorization import Authorization


class PKCEMethodUpdateProtocol(Protocol):
    name: str | Mapped[str]


class PKCEMethodUpdateKwargs(TypedDict):
    name: str


class PKCEMethod(Identifiable):
    __tablename__ = "pkce_method"
    name: Mapped[str] = mapped_column(
        Text(),
        nullable=False,
    )
    authorizations: Mapped[List[Authorization]] = relationship(
        back_populates="pkce_method",
    )

    @overload
    def update(self, pkce_method: PKCEMethodUpdateProtocol) -> Self: ...
    @overload
    def update(self, **kwargs: Unpack[PKCEMethodUpdateKwargs]) -> Self: ...
    def update(
        self,
        pkce_method: PKCEMethodUpdateProtocol | None = None,
        **kwargs: Unpack[PKCEMethodUpdateProtocol],
    ) -> Self:
        pkce_method = pkce_method or SimpleNamespace(**kwargs)
        self.name = pkce_method.name
        return self

    @classmethod
    @overload
    def create(cls, pkce_method: PKCEMethodUpdateProtocol) -> Self: ...

    @classmethod
    @overload
    def create(cls, **kwargs: Unpack[PKCEMethodUpdateKwargs]) -> Self: ...

    @classmethod
    def create(
        cls,
        pkce_method: PKCEMethodUpdateProtocol | None = None,
        **kwargs: Unpack[PKCEMethodUpdateKwargs],
    ) -> Self:
        return cls().update(pkce_method or SimpleNamespace(**kwargs))
