import { useContext, type PropsWithChildren } from "react";
import { SelectContext } from "../Select/context.ts";

type Props = {
  value: string;
};

export const Option = (props: PropsWithChildren<Props>) => {
  const context = useContext(SelectContext);
  if (!context) throw new Error("Not inside <Select>");
  return (
    <li
      tabIndex={-1}
      onClick={() => {
        context?.onSelected();
      }}
    >
      {props.children}
    </li>
  );
};
