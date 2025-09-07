from __future__ import annotations

import abc
import enum
import inspect
from functools import cached_property


class Meta(type):
    @staticmethod
    def load_properties(self):
        for name, attr in inspect.getmembers(type(self)):
            if isinstance(attr, cached_property):
                getattr(self, name)

    @staticmethod
    def write_properties(self):
        pass

    def __call__(cls, *args, **kwargs):
        self = super().__call__(*args, **kwargs)
        cls.load_properties(self)
        cls.write_properties(self)


class MetaABC(Meta, abc.ABCMeta): ...


class Base(metaclass=abc.ABCMeta):
    @property
    @abc.abstractmethod
    def variables(self) -> enum.StrEnum: ...
