from __future__ import annotations

from typing import *
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..constants import CASCADE
from .base import Identifiable

if TYPE_CHECKING:
    from .application import Application


class Identity(Identifiable):
    __tablename__ = "identity"
    application_id: Mapped[UUID] = mapped_column(
        ForeignKey("application.id", ondelete=CASCADE),
    )
    application: Mapped[Application] = relationship(
        back_populates="identities",
    )
