import { Link as ReactRouterLink } from "react-router";
import { type LinkProps } from "./types.ts";

export const Link = (props: LinkProps) => {
  return <ReactRouterLink {...props} />;
};
