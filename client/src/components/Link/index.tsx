import {
  Link as ReactRouterLink,
  type LinkProps as ReactRouterLinkProps,
  type Path as ReactRouterPath,
} from "react-router";
import { type Routes } from "../../router";

export type Paths = Routes[number]["path"];

export type Path = Omit<ReactRouterPath, "pathname"> & {
  pathname: Paths;
};

export type LinkProps = Omit<ReactRouterLinkProps, "to"> & { to: Paths | Path };

export const Link = (props: LinkProps) => {
  return <ReactRouterLink {...props} />;
};
