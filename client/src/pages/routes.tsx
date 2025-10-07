import { type RouteObject } from "react-router";
import about from "./about/routes.tsx";
import login from "./login/routes.tsx";
import { Index } from "./index.tsx";

export const index = [
  {
    path: "/",
    element: <Index />,
  } as const,
  ...about,
  ...login,
] satisfies RouteObject[];
export default index;
