import styles from "./styles.module.scss";
import React from "react";
import { css } from "../../../utils";

type WithClassName<P> = P & { className?: string };

type Props<T extends React.ElementType> =
  T extends React.ElementType<infer P>
    ? {
        component: T;
        props: WithClassName<P>;
      }
    : {
        component: T;
        props: WithClassName<React.ComponentPropsWithoutRef<T>>;
      };
export function ButtonStyles<T extends React.ElementType>(
  props: React.PropsWithChildren<Props<T>>,
) {
  return (
    <props.component
      {...props.props}
      className={css(props.props.className, styles.componentWrapper)}
    >
      <div className={css(styles.component)}>
        <div className={css(styles.componentContent)}>{props.children}</div>
      </div>
    </props.component>
  );
}
