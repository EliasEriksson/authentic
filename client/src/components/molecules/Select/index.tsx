import styles from "./styles.module.scss";
import { SelectContext } from "./context";
import React, { useRef, useState } from "react";
import { css } from "../../../utils";
import { Button } from "../../atoms/Button";

export namespace Select {
  export interface Props {
    name: string;
    className?: string;
    unsearchable?: boolean;
    initialValue?: SelectContext.Value;
    onInput?: (value: SelectContext.Value) => void;
  }
}

export function Select({
  onInput,
  ...props
}: React.PropsWithChildren<Select.Props>) {
  const rootElement = useRef<HTMLDivElement | null>(null);
  const buttonElement = useRef<(HTMLButtonElement & HTMLAnchorElement) | null>(
    null,
  );
  const [open, setOpen] = useState<SelectContext.Open>(false);
  const [value, setValue] = useState<SelectContext.Value>("");
  const [search, setSearch] = useState<SelectContext.Search>("");
  const [selectedDisplay, setSelectedDisplay] =
    useState<SelectContext.SelectedDisplay>(() => null);
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
    [onInput],
  ) satisfies SelectContext.Value.Set;
  const select = React.useMemo(
    () => ({
      get: { value, search, open, selectedDisplay },
      set: {
        value: setValueStable,
        search: setSearch,
        open: setOpen,
        selectedDisplay: setSelectedDisplay,
      },
    }),
    [open, search, selectedDisplay, setValueStable, value],
  ) satisfies SelectContext;
  return (
    <SelectContext value={select}>
      <div
        ref={rootElement}
        className={css({ [styles.open]: open }, styles.select, props.className)}
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
          name={props.name}
          type={"submit"}
          value={value}
          onClick={() => {
            setOpen((open) => !open);
          }}
        ></Button>
      </div>
    </SelectContext>
  );
}
