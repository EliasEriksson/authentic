from litestar import Litestar
from litestar.di import Provide
from litestar.openapi import OpenAPIConfig
from litestar.openapi.spec import Components, OAuthFlow, OAuthFlows, SecurityScheme

from ..dependencies import database, email
from .controller import Controller
from .router import router

gateway = Litestar(
    debug=True,
    route_handlers=[router],
    lifespan=[database.lifespan],
    dependencies={
        "database": Provide(database.client),
        "email": Provide(email)
    },
    openapi_config=OpenAPIConfig(
        title="Self-Hosted OAuth2 Server",
        version="1.0.0",
        root_schema_site="swagger",
        openapi_controller=Controller,
        components=Components(
            security_schemes={
                "Authentic": SecurityScheme(
                    type="oauth2",
                    flows=OAuthFlows(
                        authorization_code=OAuthFlow(
                            authorization_url="http://localhost:8080/oauth/authorize",
                            token_url="http://localhost:8080/oauth/token",
                            # scopes={"openid": "Authenticate with self-hosted OAuth2"},
                        )
                    ),
                )
            }
        ),
        # security=[{"oauth2": ["openid"]}],
    ),
)
