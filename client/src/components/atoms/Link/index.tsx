import {
  Link as ReactRouterLink,
  type LinkProps as ReactRouterLinkProps,
  type Path as ReactRouterPath,
} from "react-router";
import type { Paths } from "../../../router.ts";

export namespace Link {
  export type Props = Omit<ReactRouterLinkProps, "to"> & {
    to: Paths | Props.Path;
  };
  export namespace Props {
    export type Path = Omit<ReactRouterPath, "pathname"> & {
      pathname: Paths;
    };
  }
}

export const Link = (props: Link.Props) => {
  return <ReactRouterLink {...props} />;
};
