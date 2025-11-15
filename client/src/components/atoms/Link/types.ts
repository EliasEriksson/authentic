import type {
  LinkProps as ReactRouterLinkProps,
  Path as ReactRouterPath,
} from "react-router";
import { type Paths } from "../../../router.ts";

export type Path = Omit<ReactRouterPath, "pathname"> & {
  pathname: Paths;
};

export type LinkProps = Omit<ReactRouterLinkProps, "to"> & {
  to: Paths | Path;
};
