from __future__ import annotations

import enum
from functools import lru_cache
from typing import *

from server.utils.classproperty import Classproperty


class Claims(enum.StrEnum):
    audience = "aud"
    issuer = "iss"
    subject = "sub"
    issued = "iat"
    expires = "exp"

    @classmethod
    @Classproperty
    @lru_cache()
    def decode_map(cls: Self) -> Dict[str, str]:
        return {str(claim.value): str(claim.value) for claim in cls}

    @classmethod
    @Classproperty
    @lru_cache()
    def encode_map(cls) -> Dict[str, str]:
        return {str(claim.name): str(claim.value) for claim in cls}
