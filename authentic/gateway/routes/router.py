import litestar

from . import users

router = litestar.Router(
    path="/",
    route_handlers=[
        users.router,
    ],
)
