import litestar

from .controller import Controller

router = litestar.Router(
    path="/oauth/",
    route_handlers=[
        Controller,
    ],
)
