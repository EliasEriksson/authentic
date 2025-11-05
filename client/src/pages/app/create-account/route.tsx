import { type RouteObject } from "react-router";
import BlankLayout from "../../../layouts/BlankLayout/index.tsx";
import app from "../route.tsx";
import CreateAccount from "./index.tsx";

export const route = {
  path: `${app.path}/create-account` as const,
  element: <BlankLayout />,
  children: [{ path: "", element: <CreateAccount /> }],
} as const satisfies RouteObject;
export default route;
