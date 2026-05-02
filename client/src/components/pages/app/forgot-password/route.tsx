import { type RouteObject } from "react-router";
import { BaseLayout } from "../../../layouts/BaseLayout";
import app from "../route.tsx";
import ForgotPassword from "./index.tsx";

export const route = {
  path: `${app.path}/forgot-password` as const,
  element: <BaseLayout />,
  children: [{ path: "", element: <ForgotPassword /> }],
} as const satisfies RouteObject;
export default route;
