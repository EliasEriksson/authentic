from __future__ import annotations

from dataclasses import asdict, dataclass
from datetime import UTC, datetime, timedelta
from typing import *
from uuid import UUID

from jose import jwt

from authentic.configuration import Configuration
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
        return datetime + timedelta(minutes=5)

    @classmethod
    def decode(cls, token: str, audience: AudienceProtocol) -> Self:
        configuration = Configuration()
        # TODO continue here
        decoded = jwt.decode(
            token,
            audience=str(audience),
            key=configuration.jwt_public_key,
            algorithms=[Algorithms.RS512],
        )
        renamed = {
            Claims.decode_map[name]: abbreviation
            for name, abbreviation in decoded.items()
            if name in Claims.decode_map
        }
        return cls(**renamed)

    def encode(self) -> str:
        configuration = Configuration()
        source = asdict(self)
        transformed = {
            str(Claims.audience.value): str(source[Claims.audience.name]),
            str(Claims.issuer.value): str(source[Claims.issuer.name]),
            str(Claims.subject.value): str(source[Claims.subject.name]),
            str(Claims.issued.value): str(source[Claims.issued.name]),
            str(Claims.expires.value): str(source[Claims.expires.name]),
        }
        encoded = jwt.encode(
            transformed,
            configuration.jwt_private_key,
            algorithm=Algorithms.RS512.name,
        )
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
