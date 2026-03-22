import { createContext } from "react";

export interface Context {
  state: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
export const Context = createContext<Context | null>(null);
