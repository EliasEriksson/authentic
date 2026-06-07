import type { IconProps } from "../types.ts";
import { css } from "../../../../utils";
import styles from "./styles.module.scss";
import { useUUID } from "../../../../hooks/useUUID.ts";

export namespace LogoIcon {
  export type Props = IconProps;
}

export function LogoIcon(props: LogoIcon.Props) {
  const maskId = useUUID();
  return (
    <svg
      viewBox="0 0 512 512"
      {...props}
      className={css(styles.logo, props.className)}
      strokeWidth={0}
    >
      <defs>
        <mask id={maskId}>
          <rect
            x={80}
            y={192}
            width={352}
            height={352}
            fill={"white"}
            strokeWidth={0}
          />
          <path
            d={"M 237,376 L 275,376 L 260,317 L 252,317 Z"}
            stroke={"white"}
            strokeWidth={0}
            fill={"black"}
          />
        </mask>
      </defs>
      <path
        className={styles.lock}
        strokeWidth={0}
        d="M420 192h-68v-80a96 96 0 10-192 0v80H92a12 12 0 00-12 12v280a12 12 0 0012 12h328a12 12 0 0012-12V204a12 12 0 00-12-12zm-106 0H198v-80.75a58 58 0 11116 0z"
      />
      <path
        className={css(styles.letter)}
        mask={`url(#${maskId})`}
        strokeWidth={0}
        d={
          "M 140,466 L 210,466 L 222,425 L 290,425 L 302,466 L 372,466 L 285,234 L 227,234 Z"
        }
      />
    </svg>
  );
}
