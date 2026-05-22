import styles from "./styles.module.scss";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type PropsWithChildren,
} from "react";
import { css } from "../../../utils";

export namespace Heading {
  export type Props = {
    h: 1 | 2 | 3 | 4 | 5 | 6;
  } & ComponentPropsWithoutRef<"h1"> &
    ComponentPropsWithoutRef<"h2"> &
    ComponentPropsWithoutRef<"h3"> &
    ComponentPropsWithoutRef<"h4"> &
    ComponentPropsWithoutRef<"h5"> &
    ComponentPropsWithoutRef<"h6">;
}

export const Heading = forwardRef<
  HTMLHeadingElement,
  PropsWithChildren<Heading.Props>
>(function Heading({ children, h, ...props }, ref) {
  const _props = {
    ...props,
    className: css(styles.heading, props.className),
  };
  return h === 1 ? (
    <h1 {..._props} ref={ref}>
      {children}
    </h1>
  ) : h === 2 ? (
    <h2 {..._props} ref={ref}>
      {children}
    </h2>
  ) : h === 3 ? (
    <h3 {..._props} ref={ref}>
      {children}
    </h3>
  ) : h === 4 ? (
    <h4 {..._props} ref={ref}>
      {children}
    </h4>
  ) : h === 5 ? (
    <h5 {..._props} ref={ref}>
      {children}
    </h5>
  ) : (
    <h6 {..._props} ref={ref}>
      {children}
    </h6>
  );
});
