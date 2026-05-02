import { forwardRef } from "react";
import type { IconProps } from "../types.ts";
import { css } from "../../../../utils";
import styles from "./styles.module.scss";

export namespace ChevronRightIcon {
  export type Props = IconProps;
}
export const ChevronRightIcon = forwardRef<
  SVGSVGElement,
  ChevronRightIcon.Props
>((props, ref) => {
  return (
    <svg
      {...props}
      ref={ref}
      viewBox={"0 0 512 512"}
      className={css(props.className, styles.icon)}
    >
      <path
        className={styles.chevron}
        data-slot={"chevron"}
        d="M184 112l144 144-144 144"
      />
    </svg>
  );
});
