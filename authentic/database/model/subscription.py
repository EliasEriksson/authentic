from __future__ import annotations

from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..constants import CASCADE
from .model import Model

if TYPE_CHECKING:
    from .application import Application
    from .organization import Organization


class SubscriptionProtocol(Protocol):
    application_id: UUID | Mapped[UUID]
    organization_id: UUID | Mapped[UUID]


class Subscription(Model):
    __tablename__ = "subscription"
    application_id: Mapped[UUID] = mapped_column(
        ForeignKey("application.id", ondelete=CASCADE),
        primary_key=True,
        nullable=False,
    )
    organization_id: Mapped[UUID] = mapped_column(
        ForeignKey("organization.id", ondelete=CASCADE),
        primary_key=True,
        nullable=False,
    )
    application: Mapped[Application] = relationship(
        back_populates="subscriptions",
    )
    organization: Mapped[Organization] = relationship(
        back_populates="subscriptions",
    )
    __table_args__ = (UniqueConstraint(application_id, organization_id),)

    def update(self, subscription: SubscriptionProtocol) -> Self:
        self.application_id = subscription.application_id
        self.organization_id = subscription.organization_id
        return self

    @classmethod
    def create(cls, subscription: SubscriptionProtocol) -> Self:
        return cls().update(subscription)
