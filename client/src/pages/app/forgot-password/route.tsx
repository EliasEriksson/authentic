import { type RouteObject } from "react-router";
import BlankLayout from "../../../layouts/BlankLayout/index.tsx";
import app from "../route.tsx";
import ForgotPassword from "./index.tsx";

export const route = {
  path: `${app.path}/forgot-password` as const,
  element: <BlankLayout />,
  children: [{ path: "", element: <ForgotPassword /> }],
} as const satisfies RouteObject;
export default route;
