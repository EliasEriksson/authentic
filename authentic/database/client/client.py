from sqlalchemy.ext.asyncio import AsyncSession
from .operator import Operator


class Client:

    def __init__(self, reader: AsyncSession, writer: AsyncSession) -> None:
        operator = Operator(reader, writer)
