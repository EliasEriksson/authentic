import litestar

from .controller import Controller

router = litestar.Router(
    path="/sessions/",
    tags=[],
    route_handlers=[
        Controller,
    ],
)
