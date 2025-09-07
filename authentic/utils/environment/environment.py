import os
from functools import reduce

from . import types
from .exceptions import EnvironmentMissingVariableError, EnvironmentValueTypeError


class Environment:
    _environment: types.Environment

    def __init__(self, *environments: types.Environment) -> None:
        self._environment = reduce(
            lambda result, environment: result.update(environment),
            environments,
            {},
        )
        self.write(self._environment)

    def __len__(self):
        return len(self._environment)

    def write(self, environment: types.Environment) -> None:
        for variable, value in environment.items():
            if value is None:
                self._environment.pop(variable)
                os.environ.pop(variable)
            else:
                os.environ[variable] = self._environment[variable] = str(value)

    def read_string(self, variable: str) -> str:
        result = self._environment.get(variable)
        if result is None:
            raise EnvironmentMissingVariableError(variable)
        return result

    def read_int(self, variable: str) -> int:
        result = self._environment.get(variable)
        if result is None:
            raise EnvironmentMissingVariableError(variable)
        try:
            return int(result)
        except ValueError:
            raise EnvironmentValueTypeError(variable, result, "int")

    def read_float(self, variable: str) -> float:
        result = self._environment.get(variable)
        if result is None:
            raise EnvironmentMissingVariableError(variable)
        try:
            return float(result)
        except ValueError:
            raise EnvironmentValueTypeError(variable, result, "float")
