import { type RouteObject } from "react-router";
import about from "./about/routes.tsx";
import app from "./app/routes.tsx";
import { Index } from "./index.tsx";

export const index = [
  {
    path: "/",
    element: <Index />,
  } as const,
  ...about,
  ...app,
] satisfies RouteObject[];
export default index;
