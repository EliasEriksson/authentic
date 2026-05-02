import { type RouteObject } from "react-router";
import Testing from "./index.tsx";
import { MainLayout } from "../../layouts/MainLayout";
import index from "../route.tsx";

export const route = {
  path: `${index.path}testing`,
  element: <MainLayout />,
  children: [{ path: "", element: <Testing /> }],
} as const satisfies RouteObject;
export default route;
