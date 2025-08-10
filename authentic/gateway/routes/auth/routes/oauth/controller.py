from typing import *
import litestar
from litestar.params import Body, Parameter
from authentic import schemas


class Controller(litestar.Controller):
    @litestar.get("/authorize")
    async def authorize(
        self,
        application_id: Annotated[str, Parameter(query="client_id")],
        redirect_uri: Annotated[str, Parameter(query="redirect_uri")],
        oauth_state: Annotated[str, Parameter(query="state")],
        code_challenge: Annotated[str, Parameter(query="code_challenge")],
        code_challenge_method: Annotated[str, Parameter(query="code_challenge_method")],
    ) -> None:
        print(
            application_id,
            redirect_uri,
            oauth_state,
            code_challenge,
            code_challenge_method,
        )
        # check if code challenge method exists in db
        return

    @litestar.post("/token")
    async def token(
        self,
        data: schemas.token.Creatable = Body(
            media_type="application/x-www-form-urlencoded",
        ),
    ) -> None:
        print(data)
        return
