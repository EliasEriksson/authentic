from __future__ import annotations

from typing import *
from uuid import UUID

from sqlalchemy import Boolean, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..constants import CASCADE
from .base import Model

if TYPE_CHECKING:
    from .application import Application
    from .organization import Organization


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
    invitation: Mapped[bool] = mapped_column(
        Boolean(),
        nullable=False,
    )
    request: Mapped[bool] = mapped_column(
        Boolean(),
        nullable=False,
    )
    application: Mapped[Application] = relationship(
        back_populates="subscribers",
    )
    organization: Mapped[Organization] = relationship(
        back_populates="subscriptions",
    )
    __table_args__ = (UniqueConstraint(application_id, organization_id),)
