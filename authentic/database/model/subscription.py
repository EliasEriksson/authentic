from __future__ import annotations

from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..constants import CASCADE
from .base import Model

if TYPE_CHECKING:
    from .application import Application
    from .organization import Organization


class Subscription(Model):
    __tablename__ = "subscription"
    application_id: Mapped[UUID] = mapped_column(
        ForeignKey(Application.id, ondelete=CASCADE),
        primary_key=True,
        nullable=False,
    )
    organization_id: Mapped[UUID] = mapped_column(
        ForeignKey(Organization.id, ondelete=CASCADE),
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
