import { type RouteObject } from "react-router";
import { BaseLayout } from "../../../layouts/BaseLayout";
import app from "../route.tsx";
import CreateAccount from "./index.tsx";

export const route = {
  path: `${app.path}/create-account` as const,
  element: <BaseLayout />,
  children: [{ path: "", element: <CreateAccount /> }],
} as const satisfies RouteObject;
export default route;
