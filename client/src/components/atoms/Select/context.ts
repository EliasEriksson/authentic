import { createContext, type ReactNode } from "react";

export type Nullable<T> = {
  [P in keyof T]?: T[P] | null | undefined;
};

export interface SelectContext {
  value: string | number | readonly string[] | undefined;
  search: string;
  open: boolean;
  view: (() => ReactNode) | undefined;
}

export interface SelectContextController {
  get: () => SelectContext;
  set: (selected: Nullable<SelectContext>) => void;
}

export const SelectContextController = createContext<
  SelectContextController | undefined
>(undefined);
