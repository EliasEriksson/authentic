import { useState, type PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import { css } from "../../utils/css";
import { SelectContext } from "./context.ts";

interface Props {
  name: string;
}

export const Select = (props: PropsWithChildren<Props>) => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <SelectContext.Provider value={{ onSelected: () => {} }}>
        <input
          name={props.name}
          type={"button"}
          value={"button"}
          onClick={() => {
            setOpened((state) => !state);
          }}
        ></input>
        <div
          className={css.classes({
            [styles.dropDown]: true,
            [styles.open]: opened,
          })}
        >
          <input type={"text"} placeholder={"Search"}></input>
          <ul>{props.children}</ul>
        </div>
      </SelectContext.Provider>
    </>
  );
};
export default Select;
