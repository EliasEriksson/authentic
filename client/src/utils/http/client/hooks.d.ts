export namespace http {
  export type RequestInit = globalThis.RequestInit & { url: URL };
  export type Response = globalThis.Response;
}

export interface Hooks {
  response: Hooks.Response[];
}
export namespace Hooks {
  export type Response = (exchange: {
    init: http.RequestInit;
    response: http.Response;
  }) => Promise<http.Response | never> | http.Response | never;
}
