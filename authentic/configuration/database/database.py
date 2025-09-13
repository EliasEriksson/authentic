from __future__ import annotations

from typing import *

from functools import cached_property

from ...utils import environment
from alembic.config import Config as AlembicConfiguration
from .exceptions import AlembicMigrationsNotFound
from authentic import root
from pathlib import Path

if TYPE_CHECKING:
    from ..configuration import Configuration


class Database:
    _environment: environment.Environment
    _alembic: AlembicConfiguration
    configuration: Configuration

    def __init__(self, configuration: Configuration) -> None:
        self.configuration = configuration
        self._alembic = AlembicConfiguration(root.project / "alembic.ini")
        self.migrations.mkdir(exist_ok=True, parents=True)

    @cached_property
    def alembic(self) -> AlembicConfiguration:
        return self._alembic

    @cached_property
    def migrations(self) -> Path:
        return Path(self.alembic.get_main_option("script_location")) / "versions"

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
