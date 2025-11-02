import { type RouteObject } from "react-router";
import Login from "./index.tsx";
import BlankLayout from "../../../layouts/BlankLayout/index.tsx";
import app from "../route.tsx";

export const route = {
  path: `${app.path}/login` as const,
  element: <BlankLayout />,
  children: [{ path: "", element: <Login /> }],
} as const satisfies RouteObject;
export default route;
