import { createContext } from "react";

export interface SelectGroupContext {
  get: { instance: SelectGroupContext.Instance };
  set: { instance: SelectGroupContext.Instance.Set };
}
export namespace SelectGroupContext {
  export type Instance = object | null;
  export namespace Instance {
    export type Set = (instance: Instance) => void;
  }
}

export const SelectGroupContext = createContext<SelectGroupContext | null>(
  null,
);
