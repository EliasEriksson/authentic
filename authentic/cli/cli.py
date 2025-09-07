import click
import uvicorn

from authentic import root

from .. import configuration

entry = click.Group("authentic")


@entry.command("start")
@click.option(
    "username", "--username", envvar=configuration.database.Variables.username
)
def start(**cli) -> None:
    configuration = Configuration(cli)
    print(username)
    # uvicorn.run(
    #     f"{root.module.name}.gateway:gateway",
    #     port=8080,
    #     reload=True,
    #     proxy_headers=True,
    # )
