from __future__ import annotations

from authentic import exceptions


class Meta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if args or kwargs:
            raise exceptions.ConfigurationError(f"No args or kwargs allowed.")
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__()
        return cls._instances[cls]


class Singleton(metaclass=Meta): ...
