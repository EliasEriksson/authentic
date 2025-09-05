from sqlalchemy.ext.asyncio import AsyncSession


class Client:

    def __init__(self, reader: AsyncSession, writer: AsyncSession) -> None: ...
