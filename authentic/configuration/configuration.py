from typing import *

from functools import cached_property
from .database import Database


from .base import Base


class Configuration(Base):
    database: Database

    def __init__(self) -> None:
        self.database = Database(self)

    @cached_property
    def mode(self) -> Literal["production", "development"]:
        return "development"
