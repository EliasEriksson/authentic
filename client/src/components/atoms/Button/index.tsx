import { Link } from "../Link";
import React, { forwardRef } from "react";
import { css } from "../../../utils";
import styles from "./styles.module.scss";

export namespace Button {
  export type Props = Props.Link | Props.Button;
  export namespace Props {
    export type Button = React.ComponentPropsWithoutRef<"button"> & {
      to?: never;
    };
    export type Link = Link.Props;
  }
}

export const Button = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  React.PropsWithChildren<Button.Props>
>(function Button(
  { children, ...props }: React.PropsWithChildren<Button.Props>,
  ref,
) {
  const className = css(styles.buttonWrapper, props.className);
  const content = (
    <div className={css(styles.button)}>
      <div className={css(styles.buttonContent)}>{children}</div>
    </div>
  );
  return props.to !== undefined ? (
    <Link {...props} ref={ref} className={className}>
      {content}
    </Link>
  ) : (
    <button {...props} ref={ref} className={className}>
      {content}
    </button>
  );
});
