import { createBrowserRouter } from "react-router";
import routes from "./pages/routes";

export const router = createBrowserRouter(routes, {});
export { routes };
export type Routes = typeof routes;
