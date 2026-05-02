import { type PropsWithChildren, useState, useMemo } from "react";
import { SelectGroupContext } from "./context";

export namespace SelectGroupProvider {
  export type Props = PropsWithChildren<NonNullable<object>>;
}
export const SelectGroupProvider = (props: SelectGroupProvider.Props) => {
  const [instance, setInstance] = useState<SelectGroupContext.Instance>(null);
  const group = useMemo(
    () =>
      ({
        get: { instance },
        set: { instance: setInstance },
      }) satisfies SelectGroupContext,
    [instance],
  );
  return (
    <SelectGroupContext.Provider value={group}>
      {props.children}
    </SelectGroupContext.Provider>
  );
};
