import { SelectContext } from "../context";
import { useSelectContext } from "../context/hook";
import {
  forwardRef,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { css } from "../../../../utils";
import styles from "./styles.module.scss";

export namespace SelectOption {
  export interface Props {
    value: Exclude<SelectContext.Value, null | undefined>;
    searchTerms?: string[];
    className?: string;
  }
}
export const SelectOption = forwardRef<
  HTMLLIElement | null,
  PropsWithChildren<SelectOption.Props>
>((props, ref) => {
  const select = useSelectContext();
  const [hidden, setHidden] = useState<boolean>(true);
  const selectedDisplay = useMemo(() => {
    return () => props.children;
  }, [props.children]);
  useEffect(() => {
    if (props.value == select.get.value) {
      select.set.selectedDisplay(selectedDisplay);
    }
  }, [props.value, select.get.value, select.set, selectedDisplay]);
  useEffect(() => {
    if (!select.get.search) return setHidden(false);
    const terms = [props.value.toString(), ...(props.searchTerms ?? [])];
    for (const term of terms) {
      if (term.match(select.get.search)) return setHidden(false);
    }
    return setHidden(true);
  }, [props.searchTerms, props.value, select.get.search]);
  return (
    <li
      ref={ref}
      className={css(styles.option, props.className, {
        [styles.hidden]: hidden,
        [styles.selected]: props.value === select.get.value,
      })}
      onClick={() => {
        select.set.value(props.value);
        select.set.selectedDisplay(selectedDisplay);
      }}
      onKeyDown={(event) => {
        switch (event.key) {
          case "Enter":
          case "Space":
            select.set.value(props.value);
            select.set.selectedDisplay(selectedDisplay);
            break;
        }
      }}
    >
      <div className={styles.display} tabIndex={select.get.open ? 0 : -1}>
        {props.children}
      </div>
    </li>
  );
});
