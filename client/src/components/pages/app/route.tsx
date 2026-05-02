import { type RouteObject } from "react-router";
import App from "./index.tsx";
import { MainLayout } from "../../layouts/MainLayout";
import index from "../route.tsx";

export const route = {
  path: `${index.path}app`,
  element: <MainLayout />,
  children: [{ path: "", element: <App /> }],
} as const satisfies RouteObject;
export default route;
