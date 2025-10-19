import { useState, type PropsWithChildren, useMemo, useRef } from "react";
import styles from "./styles.module.scss";
import { css } from "../../utils/css.ts";
import { SelectContext, type Data } from "./context.ts";

export interface Props {
  name: string;
  initialValue?: Data["value"];
  unsearchable?: boolean;
  className?: string;
  onInput?: (value: Data["value"]) => void;
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
          const result =
            selected.value === undefined
              ? value
              : (selected.value ?? undefined);
          if (result !== value) {
            props.onInput?.(result);
            setOpen(() => false);
          }
          return result;
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
  }, [value, view, search, props]);
  return (
    <SelectContext.Provider value={context}>
      <div
        className={css(
          { [styles.open]: open },
          styles.select,
          props.className,
          "select",
        )}
        onKeyDown={(event) => {
          switch (event.key) {
            case "Escape":
              setOpen(false);
              buttonElement.current?.focus();
              break;
          }
        }}
      >
        <button
          className={css(styles.button, "select__button")}
          ref={buttonElement}
          name={props.name}
          type={"submit"}
          value={value ?? ""}
          onClick={() => {
            setOpen((state) => !state);
          }}
        >
          <div className={css(styles.view, "select__view")}>
            {view?.() ?? (
              <span className={css(styles.noValue, "select__view__no-value")}>
                {"No Value"}
              </span>
            )}
          </div>
          <div
            className={css(styles.chevronWrapper, "select__chevron-wrapper")}
          >
            <svg
              className={css(styles.chevron, "select__chevron")}
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
        <div className={css(styles.dropDown, "select__drop-down")}>
          <input
            className={css(
              { [styles.unsearchable]: props.unsearchable },
              styles.search,
              "select__search",
            )}
            type={"text"}
            placeholder={"🔍"}
            value={search}
            onInput={(event) => {
              setSearch(event.currentTarget.value);
            }}
          />
          <ul className={css(styles.list, "select__list")}>{props.children}</ul>
        </div>
      </div>
    </SelectContext.Provider>
  );
};
export default Select;
