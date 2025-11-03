import { redirect as reactRouterRedirect } from "react-router";
import type { Paths } from "../../router.ts";

export function redirect(url: Paths, init?: number | ResponseInit): never {
  throw reactRouterRedirect(url, init);
}
