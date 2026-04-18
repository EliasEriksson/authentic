import {
  type ComponentPropsWithoutRef,
  type PropsWithChildren,
  forwardRef,
} from "react";
import { css } from "../../../utils";
import styles from "./styles.module.scss";

export namespace Form {
  export type Props = ComponentPropsWithoutRef<"form">;
}

export const Form = forwardRef<HTMLFormElement, PropsWithChildren<Form.Props>>(
  function Form({ children, ...props }, ref) {
    return (
      <form {...props} ref={ref} className={css(props.className, styles.form)}>
        {children}
      </form>
    );
  },
);
