from __future__ import annotations

from ..services.email import Email


async def email() -> Email:
    return await Email.open()
