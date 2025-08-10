from __future__ import annotations
from sqlalchemy.ext.asyncio import AsyncSession
from . import operations


class Client:
    applications: operations.Applications
    subscriptions: operations.Subscriptions
    organizations: operations.Organizations
    memberships: operations.Memberships
    users: operations.Users

    def __init__(self, session: AsyncSession) -> None:
        self.applications = operations.Applications(session)
        self.subscriptions = operations.Subscriptions(session)
        self.organizations = operations.Organizations(session)
        self.memberships = operations.Memberships(session)
        self.users = operations.Users(session)
