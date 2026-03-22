import { SelectContext } from "./context";
import React, { useState } from "react";

export namespace Select {
  export interface Props {
    name: string;
    className?: string;
    unsearchable?: boolean;
    initialValue?: SelectContext["value"];
    onInput?: (value: SelectContext["value"]) => void;
  }
}

export function Select({
  onInput,
  ...props
}: React.PropsWithChildren<Select.Props>) {
  const [isOpen, setIsOpen] = useState<SelectContext["isOpen"]>(false);
  const [value, setValue] = useState<SelectContext["value"]>("");
  const [search, setSearch] = useState<SelectContext["search"]>("");
  const [selectedDisplay, setSelectedDisplay] = useState<
    SelectContext["selectedDisplay"]
  >(() => null);
  const setValueStable = React.useCallback(
    (value: SelectContext["value"]) => {
      setValue((old) => {
        if (value !== old) {
          onInput?.(value);
          setIsOpen(false);
        }
        return value;
      });
    },
    [onInput],
  );
  const select = React.useMemo(
    () => ({
      search: search,
      setSearch: setSearch,
      isOpen: isOpen,
      setIsOpen: setIsOpen,
      selectedDisplay: selectedDisplay,
      setSelectedDisplay: setSelectedDisplay,
      value: value,
      setValue: setValueStable,
    }),
    [isOpen, search, selectedDisplay, setValueStable, value],
  ) satisfies SelectContext;
  return (
    <SelectContext value={select}>
      <div></div>
    </SelectContext>
  );
}
