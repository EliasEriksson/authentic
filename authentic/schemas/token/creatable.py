import msgspec

class Creatable(msgspec.Struct):
    code: str = msgspec.field(name="code")
    code_verifier: str = msgspec.field(name="code_verifier")
    application_id: str = msgspec.field(name="client_id")
    redirect_uri: str = msgspec.field(name="redirect_uri")
