import litestar

from .controller import Controller

router = litestar.Router(
    path="/oauth/",
    tags=[],
    route_handlers=[
        Controller,
    ],
)
