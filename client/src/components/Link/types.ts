import type { Routes } from "../../router.ts";
import type {
  LinkProps as ReactRouterLinkProps,
  Path as ReactRouterPath,
} from "react-router";

export type Paths = Routes[number]["path"];

export type Path = Omit<ReactRouterPath, "pathname"> & {
  pathname: Paths;
};

export type LinkProps = Omit<ReactRouterLinkProps, "to"> & { to: Paths | Path };