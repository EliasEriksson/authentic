import { useState, type PropsWithChildren, useMemo } from "react";
import styles from "./styles.module.scss";
import { css } from "../../utils/css";
import { SelectContext, type Selected } from "./context.ts";

interface Props {
  name: string;
  initialValue?: Selected["value"];
}

export const Select = (props: PropsWithChildren<Props>) => {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState<Selected["value"]>(props.initialValue);
  const [view, setView] = useState<Selected["view"]>(undefined);
  const context: SelectContext = useMemo(() => {
    return {
      get: () => {
        return value;
      },
      set: (selected) => {
        setValue(() => selected.value);
        setView(() => selected.view);
      },
    };
  }, [value]);
  return (
    <SelectContext.Provider value={context}>
      <div>
        <button
          name={props.name}
          type={"submit"}
          value={value ?? ""}
          onClick={() => {
            setOpened((state) => !state);
          }}
        >
          {view?.() ?? <span>{"No Value"}</span>}
        </button>
        <div
          className={css.classes({
            [styles.dropDown]: true,
            [styles.open]: opened,
          })}
        >
          <input type={"text"} placeholder={"Search"}></input>
          <ul>{props.children}</ul>
        </div>
      </div>
    </SelectContext.Provider>
  );
};
export default Select;
