from __future__ import annotations

import enum
from functools import lru_cache
from typing import *

from authentic.utils.classproperty import Classproperty


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
        return {claim.name: str(claim.value) for claim in cls}

    @classmethod
    @Classproperty
    @lru_cache()
    def encode_map(cls) -> Dict[str, str]:
        return {str(claim.value): claim.name for claim in cls}


# Usage
print(Claims.decode_map)
print(Claims.decode_map)
print(Claims.encode_map)
print(Claims.encode_map)
