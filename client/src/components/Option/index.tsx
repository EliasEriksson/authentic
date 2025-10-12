import { useContext, type PropsWithChildren, useMemo } from "react";
import { css } from "../../utils/css/index.ts";
import { SelectContext } from "../Select/context.ts";
import styles from "./styles.module.scss";

type Props = {
  value: ReturnType<SelectContext["get"]>["value"];
};

export const Option = (props: PropsWithChildren<Props>) => {
  const uncheckedContext = useContext(SelectContext);
  if (!uncheckedContext) throw new Error("Not inside <Select>");
  const context = uncheckedContext;
  const view = useMemo(() => {
    return () => props.children;
  }, [props.children]);
  const selected = context.get();
  if (props.value === selected.value) context.set({ view });
  return (
    <li
      tabIndex={0}
      className={css.classes({
        [styles.option]: true,
        [styles.selected]: props.value === selected.value,
      })}
      onClick={() => {
        context.set({ value: props.value, view });
      }}
    >
      <div className={css.classes({ [styles.viewWrapper]: true })}>
        {props.children}
      </div>
    </li>
  );
};
