from __future__ import annotations

import contextlib
from typing import *

from litestar import Litestar
from litestar.datastructures import State
from sqlalchemy.exc import IntegrityError, NoResultFound

from authentic import hardcoded
from authentic.configuration import Configuration

from ..database import Client, Database, models


async def client(state: State) -> AsyncIterator[Client]:
    async with state.database.client() as client:
        yield client


async def bootstrap(client: Client) -> None:
    configuration = Configuration()
    async with client.transaction() as session:
        application = models.Application(
            id=hardcoded.identity_id,
            name="Authentic",
            open=True,
        )
        organization = models.Organization(
            id=hardcoded.identity_organization_id,
            name="Authentic's organization",
            open=False,
        )
        user = models.User(
            id=hardcoded.identity_user_id,
            name="Admin",
        )
        session.add(application)
        session.add(organization)
        session.add(user)
        await session.flush()
        identity = models.Identity(
            application=application,
        )
        subscription = models.Subscription(
            application=application,
            organization=organization,
            invitation=True,
            request=True,
        )
        membership = models.Membership(
            organization=organization,
            user=user,
            invitation=True,
            request=True,
        )
        email = models.Email(
            user=user,
            address=configuration.email.inbox,
        )
        session.add(identity)
        session.add(subscription)
        session.add(membership)
        session.add(email)


@contextlib.asynccontextmanager
async def lifespan(app: Litestar):
    async with Database.open() as database:
        if not await database.ready():
            raise RuntimeError("Database schema is not up to date.")
        app.state.database = database
        async with database.client() as client:
            try:
                await client.applications.fetch_identity()
            except NoResultFound:
                try:
                    await bootstrap(client)
                except IntegrityError:
                    pass
        yield
        del app.state.database
