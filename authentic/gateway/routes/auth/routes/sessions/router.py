import litestar

from .sessions import Sessions

router = litestar.Router(
    path="/oauth/",
    tags=[],
    route_handlers=[
        Sessions,
    ],
)
