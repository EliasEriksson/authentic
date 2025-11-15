import {
  useState,
  type PropsWithChildren,
  useMemo,
  useRef,
  useEffect,
} from "react";
import styles from "./styles.module.scss";
import { css } from "../../../utils/css.ts";
import { SelectContextController, type SelectContext } from "./context.ts";

export interface Props {
  name: string;
  initialValue?: SelectContext["value"];
  unsearchable?: boolean;
  className?: string;
  onInput?: (value: SelectContext["value"]) => void;
}

export const Select = (props: PropsWithChildren<Props>) => {
  const rootElement = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<SelectContext["value"]>(
    props.initialValue,
  );
  const [view, setView] = useState<SelectContext["view"]>(undefined);
  const [search, setSearch] = useState<string>("");
  const buttonElement = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const listener = (event: PointerEvent) => {
      if (!rootElement.current) return;
      if (event.composedPath().includes(rootElement.current)) return;
      setOpen(() => false);
    };
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);
  const context: SelectContextController = useMemo(() => {
    return {
      get: () => {
        return { value, view, search, open };
      },
      set: (context) => {
        setValue((value) => {
          const result =
            context.value === undefined ? value : (context.value ?? undefined);
          if (result !== value) {
            props.onInput?.(result);
            setOpen(() => false);
          }
          return result;
        });
        setView((view) => {
          return context.view === undefined
            ? view
            : (context.view ?? undefined);
        });
        setSearch((search) => {
          return context.search === undefined ? search : (context.search ?? "");
        });
        setOpen((open) => {
          return context.open === undefined ? open : (context.open ?? false);
        });
      },
    };
  }, [value, view, search, props, open]);
  return (
    <SelectContextController.Provider value={context}>
      <div
        ref={rootElement}
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
          <div className={css(styles.animate)}>
            <input
              tabIndex={open ? 0 : -1}
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
            <ul className={css(styles.list, "select__list")}>
              {props.children}
            </ul>
          </div>
        </div>
      </div>
    </SelectContextController.Provider>
  );
};
export default Select;
