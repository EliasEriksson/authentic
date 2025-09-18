import litestar

from . import routes
from .controller import Controller

router = litestar.Router(
    path="/auth/",
    tags=["Auth"],
    route_handlers=[
        Controller,
        routes.router,
    ],
)
