from __future__ import annotations
from typing import *
from ..classproperty import Classproperty
from base64 import b64encode, b64decode
from functools import lru_cache
import re


class HeaderException(Exception): ...


class Headers:
    _rename_pattern = re.compile(r"(?<!^)([A-Z])")

    class Authorization:
        @classmethod
        @Classproperty
        @lru_cache()
        def name(cls) -> str:
            return Headers._rename_pattern.sub(r"-\1", cls.__name__)

        @classmethod
        def format_basic(cls, username: str, password: str) -> str:
            return f"Basic {b64encode(f"{username}:{password}".encode()).decode()}"

        @classmethod
        def format_bearer(cls, token: str) -> str:
            return f"Bearer {token}"

        _basic_pattern = re.compile(r"^Basic (.+)$")

        @classmethod
        def from_basic(cls, value: str) -> Tuple[str, str]:
            if not (match := cls._basic_pattern.match(value)):
                raise HeaderException("Failed to parse basic header value.")
            credentials, *_ = match.groups()
            username, *password = b64decode(credentials.encode()).decode().split(":")
            return username, ":".join(password)

        _bearer_pattern = re.compile(rf"^Bearer (.+)$")

        @classmethod
        def from_bearer(cls, value: str) -> str:
            if not (match := cls._bearer_pattern.match(value)):
                raise HeaderException("Failed to parse bearer header value.")
            token, *_ = match.groups()
            return token
