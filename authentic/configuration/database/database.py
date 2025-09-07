from __future__ import annotations

from typing import *

from rich_click.rich_help_formatter import cached_property

if TYPE_CHECKING:
    from ..configuration import Configuration


class Database:
    configuration: Configuration

    def __init__(self, configuration: Configuration, file, cli) -> None:
        self.configuration = configuration

    @cached_property
    def username(self) -> str:

        return
