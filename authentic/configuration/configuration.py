from functools import cached_property
from typing import *

from .base import Base
from .database import Database


class Configuration(Base):
    database: Database

    def __init__(self) -> None:
        self.database = Database(self)

    @cached_property
    def mode(self) -> Literal["production", "development"]:
        return "development"
