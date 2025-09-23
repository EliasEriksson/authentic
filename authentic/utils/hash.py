from __future__ import annotations

from datetime import datetime

import bcrypt
from xxhash import xxh128


def etag(time: datetime) -> str:
    return xxh128(time.timestamp().hex()).digest().hex()


def password(password: str) -> bytes:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())


def verify_password(password: str, digest: bytes) -> bool:
    return bcrypt.checkpw(password.encode(), digest)
