from sqlalchemy.ext.asyncio import AsyncSession
from .operator import Operator
from . import operations


class Client:
    applications: operations.Applications
    organizations: operations.Organizations
    users: operations.Users

    def __init__(self, reader: AsyncSession, writer: AsyncSession) -> None:
        operator = Operator(reader, writer)
        self.applications = operations.Applications(self, operator)
        self.organizations = operations.Organizations(self, operator)
        self.users = operations.Users(self, operator)
