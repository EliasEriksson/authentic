import asyncio

import click
from alembic import command

from authentic.configuration import Configuration
from authentic.database import Database

group = click.Group("database")


@group.command()
def ready() -> None:
    async def ready():
        async with Database.open() as database:
            if await database.ready():
                print(
                    f"Tables in the database does reflect the database models! \033[32m✓\033[0m"
                )
            else:
                print(
                    f"Tables in the database does not reflect the database models. \033[31m✗\033[0m"
                )

    asyncio.run(ready())


@group.command()
@click.option("--message", "-m", type=str, help="Revision message", default=None)
def revision(message: str | None) -> None:
    configuration = Configuration()
    command.revision(
        configuration.database.alembic,
        autogenerate=True,
        message=message,
    )


@group.command()
def migrate() -> None:
    configuration = Configuration()
    for content in configuration.database.migrations.iterdir():
        if content.is_file():
            break
    else:
        command.revision(
            configuration.database.alembic,
            "Initializing database.",
            autogenerate=True,
        )
    command.upgrade(configuration.database.alembic, "head")


@group.command()
def delete() -> None:
    async def delete():
        configuration = Configuration()
        message = (
            f"This operation will delete all tables related to this "
            f"application from the database '{configuration.database.database}'.\n"
            f"OBS! This operation is irreversible.\n"
            f"Are you sure you want to continue? (y/n): "
        )
        if input(message).lower() == "y":
            print("Proceeding...")
            async with Database.open() as database:
                await database.delete()
            print("Database deleted.")
        else:
            print("Aborted.")

    asyncio.run(delete())
