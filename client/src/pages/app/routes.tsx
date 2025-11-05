import { type RouteObject } from "react-router";
import login from "./login/routes.tsx";
import createAccount from "./create-account/routes.tsx";
import forgotPassword from "./forgot-password/routes.tsx";
import resetPassword from "./reset-password/routes.tsx";
import route from "./route.tsx";

export const routes = [
  route,
  ...login,
  ...createAccount,
  ...forgotPassword,
  ...resetPassword,
] satisfies RouteObject[];
export default routes;
