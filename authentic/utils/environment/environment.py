import enum
import os
from typing import *

from . import types
from .exceptions import EnvironmentMissingVariableError, EnvironmentValueTypeError


class Environment:
    _translations: Type[enum.StrEnum]

    def __init__(
        self, translations: Type[enum.StrEnum], *environments: types.Environment
    ) -> None:
        self._translations = translations
        for environment in environments:
            self.write(environment)

    def translate(self, variable: str) -> str:
        return (
            getattr(self._translations, variable)
            if variable in self._translations
            else None
        )

    def write(self, environment: types.Environment) -> None:
        for variable, value in environment.items():
            translated = self.translate(variable)
            if value is None:
                os.environ.pop(translated)
            else:
                os.environ[translated] = str(value)

    def read_string(self, variable: str) -> str:
        result = os.environ.get(self.translate(variable))
        if result is None:
            raise EnvironmentMissingVariableError(variable)
        return result

    def read_int(self, variable: str) -> int:
        result = os.environ.get(self.translate(variable))
        if result is None:
            raise EnvironmentMissingVariableError(variable)
        try:
            return int(result)
        except ValueError:
            raise EnvironmentValueTypeError(variable, result, "int")

    def read_float(self, variable: str) -> float:
        result = os.environ.get(self.translate(variable))
        if result is None:
            raise EnvironmentMissingVariableError(variable)
        try:
            return float(result)
        except ValueError:
            raise EnvironmentValueTypeError(variable, result, "float")
