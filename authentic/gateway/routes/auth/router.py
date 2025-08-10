import litestar

from . import routes

router = litestar.Router(
    path="/auth/",
    route_handlers=[
        routes.router,
    ],
)
