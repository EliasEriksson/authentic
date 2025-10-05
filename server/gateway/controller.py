import litestar.openapi

from .. import hardcoded
from .router import router


class Controller(litestar.openapi.OpenAPIController):
    path = router.path
    swagger_ui_init_oauth = {
        # is this the authentic-client-id?
        "clientId": str(hardcoded.identity_id),
        "usePkceWithAuthorizationCodeGrant": True,
    }
