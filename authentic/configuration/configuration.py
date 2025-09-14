from functools import cached_property
from typing import *

from .base import Base
from .database import Database
from .email import Email


class Configuration(Base):
    database: Database
    email: Email

    def __init__(self) -> None:
        self.database = Database(self)
        self.email = Email(self)

    @cached_property
    def mode(self) -> Literal["production", "development"]:
        return "development"
