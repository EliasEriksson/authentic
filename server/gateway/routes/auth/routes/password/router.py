import litestar

from .controller import Controller

router = litestar.Router(
    path="/password/",
    tags=[],
    route_handlers=[
        Controller,
    ],
)
