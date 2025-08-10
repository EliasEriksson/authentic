import litestar

from . import auth

router = litestar.Router(
    path="/",
    route_handlers=[
        auth.router,
    ],
)
