import { type RouteObject } from "react-router";
import App from "./index.tsx";
import SidebarLayout from "../../layouts/SidebarLayout/index.tsx";
import index from "../route.tsx";

export const route = {
  path: `${index.path}/app`,
  element: <SidebarLayout />,
  children: [{ path: "", element: <App /> }],
} as const satisfies RouteObject;
export default route;
