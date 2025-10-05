from __future__ import annotations

import hashlib
from datetime import datetime

import bcrypt
from xxhash import xxh128


def etag(time: datetime) -> str:
    return xxh128(time.timestamp().hex()).digest().hex()


def hash(data: str) -> bytes:
    return hashlib.sha512(data.encode()).digest()


def verify_hash(data: str, digest: bytes) -> bool:
    return hash(data) == digest


def salted_hash(password: str) -> bytes:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())


def verify_salted_hash(password: str, digest: bytes) -> bool:
    return bcrypt.checkpw(password.encode(), digest)
