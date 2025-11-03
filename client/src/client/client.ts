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
            () => {
              throw routing.redirect("/app/login");
            },
          ],
        },
      }),
    );
  }
}

export const client = Client.open();
