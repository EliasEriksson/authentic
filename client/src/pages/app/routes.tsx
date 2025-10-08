import { type RouteObject } from "react-router";
import login from "./login/routes";
import App from "./index.tsx";
import AppLayout from "../../layouts/AppLayout";

export const app = [
  {
    path: "/app",
    element: <AppLayout />,
    children: [{ path: "", element: <App /> }],
  } as const,
  ...login,
] satisfies RouteObject[];
export default app;
