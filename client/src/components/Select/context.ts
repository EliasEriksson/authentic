import { createContext, type ReactNode } from "react";

export interface Selected {
  value: string | number | readonly string[] | undefined;
  view: (() => ReactNode) | undefined;
}

export interface SelectContext {
  get: () => Selected["value"];
  set: (selected: Selected) => void;
}

export const SelectContext = createContext<SelectContext | undefined>(
  undefined,
);
