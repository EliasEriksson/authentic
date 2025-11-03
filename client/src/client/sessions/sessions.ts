import { http } from "../../utils/index.ts";

export class Sessions {
  private constructor(client: http.Client) {}
  static open(client: http.Client) {
    return new this(client);
  }
}
