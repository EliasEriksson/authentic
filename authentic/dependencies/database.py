from __future__ import annotations

import contextlib
from typing import *

from litestar import Litestar
from litestar.datastructures import State

from authentic import schemas

from ..database import Client, Database


async def client(state: State) -> AsyncIterator[Client]:
    async with state.database.client() as client:
        yield client


@contextlib.asynccontextmanager
async def lifespan(app: Litestar):
    async with Database.open() as database:
        if not await database.ready():
            raise RuntimeError("Database schema is not up to date.")

        app.state.database = database
        yield
        del app.state.database
