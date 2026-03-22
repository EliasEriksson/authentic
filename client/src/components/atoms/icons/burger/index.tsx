import styles from "./styles.module.scss";
import type { IconProps } from "../types.ts";
import { css } from "../../../../utils";

export namespace BurgerIcon {
  export type Props = IconProps;
}

export function BurgerIcon(props: BurgerIcon.Props) {
  return (
    <svg
      {...props}
      viewBox="0 0 512 512"
      className={css(props.className, styles.icon)}
    >
      <path d="M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z" />
    </svg>
  );
}
