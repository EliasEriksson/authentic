import { Link } from "../Link";
import React from "react";
import { css } from "../../../utils";
import styles from "./styles.module.scss";

export namespace Button {
  export type Props =
    | Link.Props
    | (React.ComponentPropsWithoutRef<"button"> & { to?: never });
}

export function Button({
  children,
  ...props
}: React.PropsWithChildren<Button.Props>) {
  const className = css(styles.buttonWrapper, props.className);
  const content = (
    <div className={css(styles.button)}>
      <div className={css(styles.buttonContent)}>{children}</div>
    </div>
  );
  return props.to !== undefined ? (
    <Link {...props} className={className}>
      {content}
    </Link>
  ) : (
    <button {...props} className={className}>
      {content}
    </button>
  );
}
