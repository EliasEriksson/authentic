import {
  useContext,
  type PropsWithChildren,
  useMemo,
  useState,
  useEffect,
} from "react";
import { css } from "../../../utils/css.ts";
import { SelectContextController } from "../Select/context.ts";
import styles from "./styles.module.scss";

type Props = {
  value: Exclude<
    ReturnType<SelectContextController["get"]>["value"],
    null | undefined
  >;
  searchTerms?: string[];
  className?: string;
};

export const SelectOption = (props: PropsWithChildren<Props>) => {
  const uncheckedContext = useContext(SelectContextController);
  if (!uncheckedContext) throw new Error("Not inside <Select>");
  const context = uncheckedContext;
  const view = useMemo(() => {
    return () => props.children;
  }, [props.children]);
  const data = context.get();
  useEffect(() => {
    if (props.value === data.value) context.set({ view });
  }, [props.value, data.value, view, context]);
  const [hidden, setHidden] = useState<boolean>(true);
  useEffect(() => {
    (() => {
      if (!data.search) return setHidden(false);
      const terms = [props.value.toString(), ...(props.searchTerms ?? [])];
      for (const term of terms) {
        if (term.match(data.search)) return setHidden(false);
      }
      return setHidden(true);
    })();
  }, [data.search, props.searchTerms, props.value]);
  return (
    <li
      className={css(styles.option, props.className, "option", {
        [styles.hidden]: hidden,
        [styles.selected]: props.value === data.value,
      })}
      onClick={() => {
        context.set({ value: props.value, view });
      }}
      onKeyDown={(event) => {
        switch (event.key) {
          case "Enter":
          case "Space":
            context.set({ value: props.value, view });
            break;
        }
      }}
    >
      <div
        className={css(styles.viewWrapper, "option__view-wrapper")}
        tabIndex={data.open ? 0 : -1}
      >
        {props.children}
      </div>
    </li>
  );
};
export default SelectOption;
