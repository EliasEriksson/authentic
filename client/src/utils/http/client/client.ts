import type { Hooks } from "./hooks.d.ts";

export class Client {
  private readonly hooks: Hooks;

  private constructor(options?: { hooks?: Partial<Hooks> }) {
    this.hooks = {
      response: options?.hooks?.response ?? [],
    };
  }

  async request(
    method: string,
    url: URL,
    request: Omit<RequestInit, "method">,
  ): Promise<Response> {
    const response = await fetch(url, { method, ...request }).then(
      async (response) => {
        for (const hook of this.hooks.response) {
          response = await hook(response);
        }
        return response;
      },
    );
    if (400 <= response.status && response.status < 500) throw new Error();
    if (500 <= response.status) throw new Error();
    return response;
  }

  async get(url: URL, request: Omit<RequestInit, "method">) {
    return this.request("GET", url, request);
  }

  async post(url: URL, request: Omit<RequestInit, "method">) {
    return this.request("POST", url, request);
  }

  async put(url: URL, request: Omit<RequestInit, "method">) {
    return this.request("PUT", url, request);
  }

  async patch(url: URL, request: Omit<RequestInit, "method">) {
    return this.request("PATCH", url, request);
  }

  async delete(url: URL, request: Omit<RequestInit, "method">) {
    return this.request("DELETE", url, request);
  }

  static open(options?: { hooks?: Partial<Hooks> }) {
    return new this(options);
  }
}
