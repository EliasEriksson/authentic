import { type RouteObject } from "react-router";
import { Index } from "./index.tsx";

export const route = {
  path: "",
  element: <Index />,
} as const satisfies RouteObject;
export default route;
