import { createContext } from "react";

interface SelectContext {
  onSelected: () => void;
}

export const SelectContext = createContext<SelectContext | undefined>(
  undefined,
);
