import { http } from "../../utils/index.ts";
import { schemas } from "../../schemas/index.ts";
import { mime } from "../../utils/index.ts";

export class Sessions {
  readonly url = new URL(window.location.origin + "/api/sessions");
  private readonly client: http.Client;
  private constructor(client: http.Client) {
    this.client = client;
  }

  async create(email: string, password: string) {
    const response = await this.client.post(this.url, {
      headers: new Headers({
        [http.headers.contentType.name]: mime.json.name,
        [http.headers.accept.name]: mime.json.name,
      }),
      body: mime.json.serializer({ email, password }),
    });

    const result = await http.response
      .parse(response, [mime.json], schemas.Tokens)
      .next();
    if (result.done) throw new Error("Failed to pase.");
    return result.value;
  }

  static open(client: http.Client) {
    return new this(client);
  }
}
