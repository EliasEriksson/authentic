import litestar

from . import oauth

router = litestar.Router(
    path="/",
    route_handlers=[
        oauth.router,
    ],
)
