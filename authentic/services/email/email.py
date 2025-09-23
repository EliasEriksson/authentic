from __future__ import annotations

from abc import ABC, abstractmethod
from typing import *


class Email(ABC):
    _registry: dict[str, Type[Email]] = {}

    @classmethod
    @abstractmethod
    def name(cls) -> str: ...

    @abstractmethod
    async def send_text(self, recipient: str, subject: str, text: str) -> None: ...

    def __init_subclass__(cls) -> None:
        cls._registry.update({cls.name(): cls})

    def __new__(cls, *args, **kwargs) -> Email:
        return super().__new__(cls._registry["local"])

    def __repr__(self) -> str:
        return f"{self.__class__.__name__}()"

    @classmethod
    async def open(cls) -> Self:
        return cls()
