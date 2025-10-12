import { createContext, type ReactNode } from "react";

export type Nullable<T> = {
  [P in keyof T]?: T[P] | null | undefined;
};

export interface Data {
  value: string | number | readonly string[] | undefined;
  search: string;
  view: (() => ReactNode) | undefined;
}

export interface SelectContext {
  get: () => Data;
  set: (selected: Nullable<Data>) => void;
}

export const SelectContext = createContext<SelectContext | undefined>(
  undefined,
);
