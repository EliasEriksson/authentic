import click
import uvicorn

from authentic import root

entry = click.Group("authentic")


@entry.command("start")
def start() -> None:
    uvicorn.run(
        f"{root.module.name}.gateway:gateway",
        port=8080,
        reload=True,
        proxy_headers=True,
    )
