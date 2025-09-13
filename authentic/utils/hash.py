from __future__ import annotations

from datetime import datetime

from bcrypt import gensalt, hashpw
from xxhash import xxh128


def etag(time: datetime) -> str:
    return xxh128(time.timestamp().hex()).digest().hex()


def password(password: str) -> bytes:
    return hashpw(password.encode(), gensalt())
