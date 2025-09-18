import litestar

from . import oauth, password, password_reset

router = litestar.Router(
    path="/",
    route_handlers=[
        oauth.router,
        password.router,
        password_reset.router,
    ],
)
