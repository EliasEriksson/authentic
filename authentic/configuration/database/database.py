from __future__ import annotations

from typing import *

from functools import cached_property

from ...utils import environment

if TYPE_CHECKING:
    from ..configuration import Configuration


class Database:
    _environment: environment.Environment
    configuration: Configuration

    def __init__(self, configuration: Configuration) -> None:
        self.configuration = configuration

    @cached_property
    def username(self) -> str:
        return "authentic"

    @cached_property
    def password(self) -> str:
        return "authentic"

    @cached_property
    def database(self) -> str:
        return "authentic"

    @cached_property
    def host(self) -> str:
        return "localhost"

    @cached_property
    def port(self) -> int:
        return 5432

    @cached_property
    def url(self) -> str:
        return f"postgresql+psycopg://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}"
