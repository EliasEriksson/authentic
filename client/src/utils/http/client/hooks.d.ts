export namespace http {
  export type Response = globalThis.Response;
}

export interface Hooks {
  response: Hooks.Response[];
}
export namespace Hooks {
  export type Response = (
    response: http.Response,
  ) => Promise<http.Response | never> | http.Response | never;
}
