import React from "react";
import styles from "./styles.module.scss";
import { css } from "../../../utils";

export namespace Collapse {
  export type Direction = "left-to-right" | "top-to-bottom";
  export interface Props {
    open: boolean;
    direction: Direction;
    className?: string;
  }
}

const directions = {
  "left-to-right": styles.leftToRight,
  "top-to-bottom": styles.topToBottom,
} satisfies Record<Collapse.Direction, string>;

export function Collapse({
  children,
  ...props
}: React.PropsWithChildren<Collapse.Props>) {
  return (
    <div
      className={css(
        styles.collapse,
        { [styles.open]: props.open },
        directions[props.direction],
        props.className,
      )}
    >
      <div className={styles.collapseContent}>{children}</div>
    </div>
  );
}
