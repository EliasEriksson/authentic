import styles from "./styles.module.scss";
import { SelectContext } from "./context";
import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  type PropsWithChildren,
} from "react";
import { css } from "../../../utils";
import { Button } from "../Button";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import { Collapse } from "../Collapse";
import { useGroupSelectContext, useGroupOpen } from "./Group/context/hooks.ts";

export namespace Select {
  export interface Props {
    name: string;
    className?: string;
    unsearchable?: boolean;
    onInput?: (value: SelectContext.Value) => void;
    initialValue?: SelectContext.Value;
    noMatchingValue?: {
      display: SelectContext.SelectedDisplay;
    };
  }
}
export const Select = forwardRef<
  HTMLDivElement | null,
  PropsWithChildren<Select.Props>
>(({ onInput, ...props }, ref) => {
  const rootElement = useRef<HTMLDivElement | null>(null);
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    ref,
    () => rootElement.current,
    [rootElement],
  );
  const buttonElement = useRef<(HTMLButtonElement & HTMLAnchorElement) | null>(
    null,
  );
  const group = useGroupSelectContext();
  const [open, setOpen] = useGroupOpen(group);
  const [value, setValue] = useState<SelectContext.Value>(props.initialValue);
  const [search, setSearch] = useState<SelectContext.Search>("");
  const [selectedDisplay, setSelectedDisplay] =
    useState<SelectContext.SelectedDisplay>(
      () => props.noMatchingValue?.display ?? (() => null),
    );
  const setValueStable = React.useCallback(
    (value) => {
      setValue((old) => {
        if (value !== old) {
          onInput?.(value);
          setOpen(false);
        }
        return value;
      });
    },
    [onInput, setOpen],
  ) satisfies SelectContext.Value.Set;
  const select = React.useMemo(
    () => ({
      get: { value, search, open, selectedDisplay },
      set: {
        value: setValueStable,
        search: setSearch,
        open: setOpen,
        selectedDisplay: (value) => setSelectedDisplay(() => value),
      },
    }),
    [open, search, selectedDisplay, setOpen, setValueStable, value],
  ) satisfies SelectContext;
  return (
    <div
      ref={ref}
      data-slot-select={"select"}
      className={css(styles.select, props.className, {
        [styles.open]: open,
      })}
      onKeyDown={(event) => {
        switch (event.key) {
          case "Escape":
            setOpen(false);
            buttonElement.current?.focus();
            break;
        }
      }}
    >
      <Button
        ref={buttonElement}
        className={styles.button}
        name={props.name}
        type={"submit"}
        value={value ?? ""}
        onClick={() => {
          setOpen((open) => !open);
        }}
      >
        <div className={styles.buttonContent}>
          <div className={styles.display}>{selectedDisplay()}</div>
          <ChevronRightIcon className={styles.buttonChevron} />
        </div>
      </Button>
      <div data-slot-select={"drop-down"} className={styles.dropDown}>
        <Collapse open={open} direction={"top-to-bottom"}>
          <div className={styles.dropDownContent}>
            <input
              tabIndex={open ? 0 : -1}
              className={css(styles.search, {
                [styles.unsearchable]: props.unsearchable,
              })}
              type={"text"}
              placeholder={"🔍"}
              value={search}
              onInput={(event) => {
                setSearch(event.currentTarget.value);
              }}
            />
            <ul className={styles.options}>
              <SelectContext.Provider value={select}>
                {props.children}
              </SelectContext.Provider>
            </ul>
          </div>
        </Collapse>
      </div>
    </div>
  );
});
