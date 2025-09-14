from __future__ import annotations

import contextlib
from typing import *

from litestar import Litestar
from litestar.datastructures import State
from uuid import UUID
from sqlalchemy.exc import NoResultFound, IntegrityError

from authentic import schemas

from ..database import Client, Database, models


async def client(state: State) -> AsyncIterator[Client]:
    async with state.database.client() as client:
        yield client


async def bootstrap(client: Client) -> None:
    print("starting")
    async with client.transaction() as session:
        print("started")
        application = models.Application(
            id=UUID("00000000-0000-4000-0000-000000000000"),
            name="Authentic",
            open=False,
        )
        organization = models.Organization(
            id=UUID("11111111-1111-4111-1111-111111111111"),
            name="Authentic's organization",
            open=False,
        )
        user = models.User(
            id=UUID("11111111-1111-4111-1111-111111111111"),
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
        session.add(identity)
        session.add(subscription)
        session.add(membership)


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
                    print("bootstrapping")
                    await bootstrap(client)
                except IntegrityError:
                    pass
        yield
        del app.state.database
