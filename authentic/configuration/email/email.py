from __future__ import annotations

from functools import cached_property
from typing import *

from ...utils import environment

if TYPE_CHECKING:
    from ..configuration import Configuration


class Email:
    _environment: environment.Environment
    configuration: Configuration

    def __init__(self, configuration: Configuration) -> None:
        self.configuration = configuration

    @cached_property
    def inbox(self) -> str:
        return "mail@authentic.org"

    @cached_property
    def sender(self) -> str:
        return "support@authentic.org"
