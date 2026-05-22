import React from "react";
import styles from "./styles.module.scss";
import { css } from "../../../utils";

export namespace Collapse {
  export type Direction = "left-to-right" | "top-to-bottom";
  export interface Props {
    open: boolean;
    direction: Direction;
    className?: string;
    subgrid?: boolean;
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
        directions[props.direction],
        props.className,
        {
          [styles.open]: props.open,
          [styles.subgrid]: props.subgrid,
        },
      )}
    >
      <div className={styles.collapseContent} inert={!props.open}>
        {children}
      </div>
    </div>
  );
}
