import {
  useContext,
  type PropsWithChildren,
  useMemo,
  useState,
  useEffect,
} from "react";
import { css } from "../../utils/css/index.ts";
import { SelectContext } from "../Select/context.ts";
import styles from "./styles.module.scss";

type Props = {
  value: Exclude<ReturnType<SelectContext["get"]>["value"], null | undefined>;
  searchTerms?: string[];
};

export const Option = (props: PropsWithChildren<Props>) => {
  const uncheckedContext = useContext(SelectContext);
  if (!uncheckedContext) throw new Error("Not inside <Select>");
  const context = uncheckedContext;
  const view = useMemo(() => {
    return () => props.children;
  }, [props.children]);
  const data = context.get();
  if (props.value === data.value) context.set({ view });
  const [hidden, setHidden] = useState<boolean>(true);
  useEffect(() => {
    (() => {
      if (!data.search) {
        return setHidden(false);
      }
      const terms = [props.value.toString(), ...(props.searchTerms ?? [])];
      for (const term of terms) {
        if (term.match(data.search)) {
          console.log("search hit", data.search, term);
          return setHidden(false);
        }
      }
      console.log("no search hit for any of", terms, data.search);
      return setHidden(true);
    })();
  }, [data.search, props.searchTerms, props.value]);
  console.log(props.value, "is hidden", hidden);
  return (
    <li
      tabIndex={0}
      className={css.classes({
        [styles.option]: true,
        [styles.hidden]: hidden,
        [styles.selected]: props.value === data.value,
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
