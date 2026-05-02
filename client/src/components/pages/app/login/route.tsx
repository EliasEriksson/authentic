import { type RouteObject } from "react-router";
import Login from "./index.tsx";
import { BaseLayout } from "../../../layouts/BaseLayout";
import app from "../route.tsx";

export const route = {
  path: `${app.path}/login` as const,
  element: <BaseLayout />,
  children: [{ path: "", element: <Login /> }],
} as const satisfies RouteObject;
export default route;
