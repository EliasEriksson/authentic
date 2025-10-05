from __future__ import annotations

from dataclasses import asdict, dataclass
from datetime import UTC, datetime, timedelta
from typing import *
from uuid import UUID

from jose import jwt

from server.configuration import Configuration
from server.schemas.access_token.algorithms import Algorithms
from server.schemas.access_token.claims import Claims


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
        decoded = jwt.decode(
            token,
            audience=str(audience),
            key=configuration.jwt_public_key,
            algorithms=[Algorithms.RS512.name],
        )
        transformed = {
            Claims.audience.name: decoded[str(Claims.audience.value)],
            Claims.issuer.name: decoded[str(Claims.issuer.value)],
            Claims.subject.name: UUID(decoded[str(Claims.subject.value)]),
            Claims.issued.name: datetime.fromtimestamp(
                decoded[str(Claims.issued.value)]
            ),
            Claims.expires.name: datetime.fromtimestamp(
                decoded[str(Claims.expires.value)]
            ),
        }
        return cls(**transformed)

    def encode(self) -> str:
        configuration = Configuration()
        source = asdict(self)
        transformed = {
            str(Claims.audience.value): str(source[Claims.audience.name]),
            str(Claims.issuer.value): str(source[Claims.issuer.name]),
            str(Claims.subject.value): str(source[Claims.subject.name]),
            str(Claims.issued.value): int(source[Claims.issued.name].timestamp()),
            str(Claims.expires.value): int(source[Claims.expires.name].timestamp()),
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
