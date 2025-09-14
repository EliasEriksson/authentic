import litestar

from .controller import Controller

router = litestar.Router(
    path="/users/",
    tags=["Users"],
    route_handlers=[
        Controller,
    ],
)
