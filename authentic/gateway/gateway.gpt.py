import base64
import hashlib
import urllib.parse
from datetime import datetime, timedelta
from typing import Dict
from uuid import uuid4

from litestar import Litestar, Request, Response, get, post
from litestar.openapi import OpenAPIConfig
from litestar.openapi.controller import OpenAPIController
from litestar.openapi.spec import Components, OAuthFlow, OAuthFlows, SecurityScheme
from litestar.response import Redirect

# In-memory storage (for demo only)
AUTH_CODES: Dict[str, dict] = {}
TOKENS: Dict[str, dict] = {}

# Dummy user
DUMMY_USER = {"id": "user123", "username": "demo"}


# Authorization endpoint (emulates login + PKCE challenge)
@get("/oauth/authorize")
async def authorize(request: Request) -> Response:
    query = request.query_params
    client_id = query.get("client_id")
    redirect_uri = query.get("redirect_uri")
    state = query.get("state")
    code_challenge = query.get("code_challenge")
    code_challenge_method = query.get("code_challenge_method")
    if not all([client_id, redirect_uri, code_challenge]):
        print(client_id, redirect_uri, code_challenge)
        return Response(content="Missing parameters", status_code=400)

    # Generate auth code
    code = str(uuid4())
    AUTH_CODES[code] = {
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "user_id": DUMMY_USER["id"],
        "code_challenge": code_challenge,
        "code_challenge_method": code_challenge_method,
        "expires": datetime.utcnow() + timedelta(minutes=10),
    }

    redirect_url = f"{redirect_uri}?code={code}"
    if state:
        redirect_url += f"&state={urllib.parse.quote(state)}"
    return Redirect(redirect_url)


# Token exchange endpoint
@post("/oauth/token")
async def token(request: Request) -> dict:
    form = await request.form()
    code = form.get("code")
    code_verifier = form.get("code_verifier")
    client_id = form.get("client_id")
    redirect_uri = form.get("redirect_uri")

    if not all([code, code_verifier, client_id, redirect_uri]):
        return {"error": "invalid_request"}

    auth_data = AUTH_CODES.get(code)
    if (
        not auth_data
        or auth_data["client_id"] != client_id
        or auth_data["redirect_uri"] != redirect_uri
    ):
        return {"error": "invalid_grant"}

    # Verify code challenge
    expected_challenge = (
        base64.urlsafe_b64encode(hashlib.sha256(code_verifier.encode()).digest())
        .rstrip(b"=")
        .decode()
    )

    if expected_challenge != auth_data["code_challenge"]:
        return {"error": "invalid_grant"}

    # Generate access token
    access_token = str(uuid4())
    TOKENS[access_token] = {
        "user_id": auth_data["user_id"],
        "expires": datetime.utcnow() + timedelta(hours=1),
    }

    return {
        "access_token": access_token,
        "token_type": "Bearer",
        "expires_in": 3600,
    }


# Protected endpoint
@get("/me", tags=["User"])
async def get_user(request: Request) -> dict:
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        return {"error": "unauthorized"}

    token = auth[7:]
    data = TOKENS.get(token)
    if not data or data["expires"] < datetime.utcnow():
        return {"error": "invalid_token"}

    return {"user_id": data["user_id"]}


# Swagger UI served at /docs
class Controller(OpenAPIController):
    path = "/docs"
    swagger_ui_init_oauth = {
        "clientId": "authentic-client-id",
        "usePkceWithAuthorizationCodeGrant": True,
    }


gateway = Litestar(
    route_handlers=[authorize, token, get_user],
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
                            scopes={"openid": "Authenticate with self-hosted OAuth2"},
                        )
                    ),
                )
            }
        ),
        security=[{"oauth2": ["openid"]}],
    ),
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(gateway, host="127.0.0.1", port=8000)
