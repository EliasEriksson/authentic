import { useCallback, useContext, useRef, useState } from "react";
import { SelectGroupContext } from "./index.ts";
import { SelectContext } from "../../context";

export function useGroupSelectContext() {
  return useContext(SelectGroupContext);
}

export function useGroupOpen(group: SelectGroupContext | null) {
  const instance = useRef<NonNullable<object>>({});
  const [localOpen, setLocalOpen] = useState<SelectContext.Open>(false);
  const setGroupOpen = useCallback<typeof setLocalOpen>(
    (open) => {
      const next =
        typeof open === "function"
          ? open(instance.current === group?.get.instance)
          : open;
      group?.set.instance(next ? instance.current : null);
    },
    [group?.get.instance, group?.set],
  );
  return !group
    ? ([localOpen, setLocalOpen] as const)
    : ([instance.current === group.get.instance, setGroupOpen] as const);
}
