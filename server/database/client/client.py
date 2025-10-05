import contextlib
from typing import *

from sqlalchemy.ext.asyncio import AsyncSession

from . import operations
from .operator import Operator


class Client:
    _operator: Operator
    applications: operations.Applications
    emails: operations.Emails
    organizations: operations.Organizations
    users: operations.Users
    passwords: operations.Passwords
    password_reset: operations.PasswordResets
    sessions: operations.Sessions

    def __init__(self, reader: AsyncSession, writer: AsyncSession) -> None:
        self._operator = Operator(reader, writer)
        self.applications = operations.Applications(self, self._operator)
        self.organizations = operations.Organizations(self, self._operator)
        self.users = operations.Users(self, self._operator)
        self.passwords = operations.Passwords(self, self._operator)
        self.password_reset = operations.PasswordResets(self, self._operator)
        self.emails = operations.Emails(self, self._operator)
        self.sessions = operations.Sessions(self, self._operator)

    @contextlib.asynccontextmanager
    async def transaction(self) -> AsyncIterator[AsyncSession]:
        async with self._operator.transaction() as session:
            yield session
