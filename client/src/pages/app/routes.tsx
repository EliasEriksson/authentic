import { type RouteObject } from "react-router";
import login from "./login/routes.tsx";
import route from "./route.tsx";

export const routes = [route, ...login] satisfies RouteObject[];
export default routes;
