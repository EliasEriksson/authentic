from __future__ import annotations

import contextlib
from typing import *

from litestar import Litestar

from ..database import Client, Database


async def client(app: Litestar) -> AsyncIterator[Client]:
    async with app.state.database.client() as client:
        yield client


@contextlib.asynccontextmanager
async def lifespan(app: Litestar):
    async with Database.open() as database:
        app.state.database = database
        yield
        del app.state.database
