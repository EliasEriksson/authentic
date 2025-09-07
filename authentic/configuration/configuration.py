import os
from pathlib import Path
from typing import *

from rich_click.rich_help_formatter import cached_property

from authentic import root, utils
from authentic.utils import environment

from .base import Base
from .variables import Variables


class Configuration(Base):
    variables = Variables
    _configuration_file: Path = root.project.joinpath(f"configuration.yaml")
    _environment: environment.Environment

    def __init__(self, file, cli: environment.types.Environment) -> None:
        self._environment = environment.Environment(cli)

    @cached_property
    def mode(self) -> Literal["production", "development"]:
        return
