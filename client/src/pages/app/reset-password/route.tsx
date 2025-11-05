import { type RouteObject } from "react-router";
import BlankLayout from "../../../layouts/BlankLayout/index.tsx";
import app from "../route.tsx";
import ResetPassword from "./index.tsx";

export const route = {
  path: `${app.path}/reset-password` as const,
  element: <BlankLayout />,
  children: [{ path: "", element: <ResetPassword /> }],
} as const satisfies RouteObject;
export default route;
