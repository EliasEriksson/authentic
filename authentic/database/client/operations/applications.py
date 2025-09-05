from typing import *
from ... import model
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID


class Applications:
    _session: AsyncSession

    async def fetch(self, id: UUID) -> model.Application: ...

    async def list(self) -> List[model.Application]: ...

    async def create(self, application: model.Application) -> model.Application: ...
