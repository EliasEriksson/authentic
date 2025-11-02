import { type RouteObject } from "react-router";
import App from "./index.tsx";
import AppLayout from "../../layouts/AppLayout/index.tsx";
import index from "../route.tsx";

export const route = {
  path: `${index.path}/app`,
  element: <AppLayout />,
  children: [{ path: "", element: <App /> }],
} as const satisfies RouteObject;
export default route;
