import { type RouteObject } from "react-router";
import Testing from "./index.tsx";
import SidebarLayout from "../../layouts/SidebarLayout/index.tsx";
import index from "../route.tsx";

export const route = {
  path: `${index.path}/testing`,
  element: (
    <SidebarLayout header={"header"} aside={"aside"} footer={"footer"} />
  ),
  children: [{ path: "", element: <Testing /> }],
} as const satisfies RouteObject;
export default route;
