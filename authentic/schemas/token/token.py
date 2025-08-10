import msgspec


class Token(msgspec.Struct):
    access_token: str
    token_type: str
    expires_in: int

