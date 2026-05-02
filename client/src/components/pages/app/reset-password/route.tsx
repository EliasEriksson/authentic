import { type RouteObject } from "react-router";
import { BaseLayout } from "../../../layouts/BaseLayout";
import app from "../route.tsx";
import ResetPassword from "./index.tsx";

export const route = {
  path: `${app.path}/reset-password` as const,
  element: <BaseLayout />,
  children: [{ path: "", element: <ResetPassword /> }],
} as const satisfies RouteObject;
export default route;
