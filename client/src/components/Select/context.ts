import { createContext, type ReactNode } from "react";

export type Nullable<T> = {
  [P in keyof T]?: T[P] | null | undefined;
};

export interface Selected {
  value: string | number | readonly string[] | undefined;
  search: string;
  view: (() => ReactNode) | undefined;
}

export interface SelectContext {
  get: () => Selected;
  set: (selected: Nullable<Selected>) => void;
}

export const SelectContext = createContext<SelectContext | undefined>(
  undefined,
);
