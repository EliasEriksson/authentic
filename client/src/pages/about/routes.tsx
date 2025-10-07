import { type RouteObject } from "react-router";
import About from "./index.tsx";

export const about = [
  {
    path: "/about",
    element: <About />,
    children: [{ path: "", element: <div>asd</div> }],
  } as const,
] satisfies RouteObject[];
export default about;
