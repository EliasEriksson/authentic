from __future__ import annotations

from dataclasses import asdict, dataclass
from datetime import UTC, datetime, timedelta
from typing import *
from uuid import UUID

from jose import jwt

from authentic.schemas.access_token.algorithms import Algorithms
from authentic.schemas.access_token.claims import Claims


class AudienceProtocol(Protocol):
    def __str__(self) -> str: ...


@dataclass(frozen=True)
class AccessToken:
    audience: str
    issuer: str
    subject: UUID
    issued: datetime
    expires: datetime

    @staticmethod
    def _now() -> datetime:
        return datetime.now(UTC).replace(microsecond=0)

    @staticmethod
    def _expires(datetime: datetime) -> datetime:
        return datetime + timedelta(minutes=20)

    @classmethod
    def decode(cls, token: str, audience: AudienceProtocol) -> Self:
        decoded = jwt.decode(token, key="secret", algorithms=[Algorithms.RS512])
        renamed = {
            Claims.decode_map[name]: abbreviation
            for name, abbreviation in decoded.items()
            if name in Claims.decode_map
        }
        return cls(**renamed)

    def encode(self) -> str:
        renamed = {
            Claims.encode_map[abbreviation]: name
            for abbreviation, name in asdict(self).items()
            if abbreviation in Claims.encode_map
        }
        encoded = jwt.encode(renamed, "secret", algorithm=Algorithms.RS512)
        return encoded

    @classmethod
    def create(
        cls, email: UUID, audience: AudienceProtocol, issuer: AudienceProtocol
    ) -> Self:
        now = cls._now()
        return cls(
            audience=str(audience),
            issuer=str(issuer),
            subject=email,
            issued=now,
            expires=cls._expires(now),
        )
