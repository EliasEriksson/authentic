import litestar

from .password import Password

router = litestar.Router(
    path="/password/",
    tags=[],
    route_handlers=[
        Password,
    ],
)
