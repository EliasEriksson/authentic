from pathlib import Path


class AlembicMigrationsNotFound(Exception):
    def __init__(self, path: Path) -> None:
        message = (
            f"Alembic migrations could not be found at location '{path.absolute()}'. "
            f"alembic.ini is either misconfigured or migrations directory is misplaced."
        )
        super().__init__(message)
