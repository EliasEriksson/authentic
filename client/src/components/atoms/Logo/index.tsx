import { type SVGAttributes, useId } from "react";
import { css } from "../../../utils/index.ts";
import styles from "./styles.module.scss";

interface LogoProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

export function Logo(props: LogoProps) {
  const maskId = useId();
  return (
    <svg
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={css(styles.logo, props.className)}
    >
      <defs>
        <mask id={maskId}>
          <rect x={80} y={192} width={352} height={352} fill={"white"} />
          <path
            d={"M 237,376 L 275,376 L 260,317 L 252,317 Z"}
            fill={"black"}
          />
        </mask>
      </defs>
      <path
        className={css(styles.padlock)}
        d="M420 192h-68v-80a96 96 0 10-192 0v80H92a12 12 0 00-12 12v280a12 12 0 0012 12h328a12 12 0 0012-12V204a12 12 0 00-12-12zm-106 0H198v-80.75a58 58 0 11116 0z"
      />
      <path
        className={css(styles.letter)}
        mask={`url(#${maskId})`}
        d={
          "M 140,466 L 210,466 L 222,425 L 290,425 L 302,466 L 372,466 L 285,234 L 227,234 Z"
        }
      />
    </svg>
  );
}
export default Logo;
