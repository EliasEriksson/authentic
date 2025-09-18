import litestar

from . import auth, users

router = litestar.Router(
    path="/",
    route_handlers=[
        auth.router,
        users.router,
    ],
)
