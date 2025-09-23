import litestar

from .password_reset import PasswordReset

router = litestar.Router(
    path="/password-reset/",
    tags=[],
    route_handlers=[
        PasswordReset,
    ],
)
