import { type RouteObject } from "react-router";
import about from "./about/routes.tsx";
import app from "./app/routes.tsx";
import testing from "./testing/routes.tsx";
import route from "./route.tsx";

export const routes = [
  route,
  ...about,
  ...app,
  ...testing,
] satisfies RouteObject[];
export default routes;
