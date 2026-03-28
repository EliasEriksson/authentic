import { createContext, type ReactNode } from "react";

export interface SelectContext {
  get: {
    value: SelectContext.Value;
    search: SelectContext.Search;
    open: SelectContext.Open;
    selectedDisplay: SelectContext.SelectedDisplay;
  };
  set: {
    value: SelectContext.Value.Set;
    search: SelectContext.Search.Set;
    open: SelectContext.Open.Set;
    selectedDisplay: SelectContext.SelectedDisplay.Set;
  };
}
export namespace SelectContext {
  export type Value = string | number | readonly string[] | undefined;
  export namespace Value {
    export type Set = (value: Value) => void;
  }
  export type Search = string;
  export namespace Search {
    export type Set = (search: Search) => void;
  }
  export type Open = boolean;
  export namespace Open {
    export type Set = (open: Open) => void;
  }
  export type SelectedDisplay = () => ReactNode;
  export namespace SelectedDisplay {
    export type Set = (selectedDisplay: SelectedDisplay) => void;
  }
}

export const SelectContext = createContext<SelectContext | null>(null);
