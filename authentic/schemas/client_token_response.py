import msgspec


class ClientTokenResponse(msgspec.Struct):
    __schema_name__ = "ClientTokenResponse"
    access_token: str
