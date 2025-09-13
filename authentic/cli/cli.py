import click
import uvicorn
from . import database

from authentic import root

entry = click.Group("authentic")
entry.add_command(database.group)


@entry.command("start")
def start() -> None:
    uvicorn.run(
        f"{root.module.name}.gateway:gateway",
        port=8080,
        reload=True,
        proxy_headers=True,
    )
