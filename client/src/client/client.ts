import { http, routing } from "../utils/index.ts";
import { Sessions } from "./sessions/index.ts";

export class Client {
  readonly sessions: Sessions;
  constructor(client: http.Client) {
    this.sessions = Sessions.open(client);
  }
  static open() {
    return new this(
      http.Client.open({
        hooks: {
          response: [
            ({ init, response }) => {
              const url = new URL(response.url);
              if (response.status !== 401) return response;
              if (init.method !== "POST") return response;
              if (url.pathname !== "/api/sessions") return response;
              throw routing.redirect("/app/login");
            },
          ],
        },
      }),
    );
  }
}

export const client = Client.open();
