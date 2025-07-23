from pathlib import Path
from typing import *

from authentic import root, utils


class Configuration(utils.Singleton):
    cli: Dict[str, Any] = {}
    file: Path = root.project.joinpath(f"configuration.json")

    def __init__(self) -> None:
        pass
