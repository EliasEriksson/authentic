import litestar.openapi

from .router import router


class Controller(litestar.openapi.OpenAPIController):
    path = router.path
    swagger_ui_init_oauth = {
        "clientId": "authentic-client-id",
        "usePkceWithAuthorizationCodeGrant": True,
    }
