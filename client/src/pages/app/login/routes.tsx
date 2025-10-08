import { type RouteObject } from "react-router";
import Login from "./index.tsx";

export const login = [
  {
    path: "/login",
    element: <Login />,
  } as const,
] satisfies RouteObject[];
export default login;
