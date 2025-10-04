import litestar

from .controller import Controller

router = litestar.Router(
    path="/password-reset/",
    tags=[],
    route_handlers=[
        Controller,
    ],
)
