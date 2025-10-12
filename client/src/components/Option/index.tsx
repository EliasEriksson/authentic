import { useContext, type PropsWithChildren, useMemo } from "react";
import { css } from "../../utils/css/index.ts";
import { SelectContext } from "../Select/context.ts";
import styles from "./styles.module.scss";

type Props = {
  value: ReturnType<SelectContext["get"]>;
};

export const Option = (props: PropsWithChildren<Props>) => {
  const uncheckedContext = useContext(SelectContext);
  if (!uncheckedContext) throw new Error("Not inside <Select>");
  const context = uncheckedContext;
  const view = useMemo(() => {
    return () => props.children;
  }, [props.children]);
  const value = context.get();
  if (props.value === value) context.set({ value, view });
  return (
    <li
      tabIndex={0}
      className={css.classes({
        [styles.selected]: props.value === value,
      })}
      onClick={() => {
        context.set({ value: props.value, view });
      }}
    >
      {props.children}
    </li>
  );
};
