import { useState, type PropsWithChildren, useMemo, useRef } from "react";
import styles from "./styles.module.scss";
import { css } from "../../utils/css";
import { SelectContext, type Data } from "./context.ts";

interface Props {
  name: string;
  initialValue?: Data["value"];
  className?: string;
}

export const Select = (props: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Data["value"]>(props.initialValue);
  const [view, setView] = useState<Data["view"]>(undefined);
  const [search, setSearch] = useState<string>("");
  const buttonElement = useRef<HTMLButtonElement>(null);
  const context: SelectContext = useMemo(() => {
    return {
      get: () => {
        return { value, view, search };
      },
      set: (selected) => {
        setValue((value) => {
          return selected.value === undefined
            ? value
            : (selected.value ?? undefined);
        });
        setView((view) => {
          return selected.view === undefined
            ? view
            : (selected.view ?? undefined);
        });
        setSearch((search) => {
          return selected.search === undefined
            ? search
            : (selected.search ?? "");
        });
      },
    };
  }, [value, view, search]);
  return (
    <SelectContext.Provider value={context}>
      <div
        className={css.classes({
          [styles.select]: true,
          [styles.open]: open,
          ...(props.className !== undefined && { [props.className]: true }),
        })}
        onKeyDown={(event) => {
          console.log(event.key);
          switch (event.key) {
            case "Escape":
              setOpen(false);
              buttonElement.current?.focus();
              break;
          }
        }}
      >
        <button
          ref={buttonElement}
          className={css.classes({ [styles.button]: true, button: true })}
          name={props.name}
          type={"submit"}
          value={value ?? ""}
          onClick={() => {
            setOpen((state) => !state);
          }}
        >
          <div className={css.classes({ [styles.view]: true, view: true })}>
            {view?.() ?? (
              <span className={css.classes({ [styles.noValue]: true })}>
                {"No Value"}
              </span>
            )}
          </div>
          <div className={css.classes({ [styles.chevronWrapper]: true })}>
            <svg
              className={css.classes({ [styles.chevron]: true })}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={512}
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M184 112l144 144-144 144"
              />
            </svg>
          </div>
        </button>
        <div
          className={css.classes({
            [styles.dropDown]: true,
            "drop-down": true,
          })}
        >
          <input
            type={"text"}
            placeholder={"Search..."}
            className={css.classes({ [styles.search]: true, search: true })}
            value={search}
            onInput={(event) => {
              setSearch(event.currentTarget.value);
            }}
          />
          <ul className={css.classes({ [styles.list]: true })}>
            {props.children}
          </ul>
        </div>
      </div>
    </SelectContext.Provider>
  );
};
export default Select;
