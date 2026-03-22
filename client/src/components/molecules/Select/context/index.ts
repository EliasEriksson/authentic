import React, { createContext } from "react";

export interface SelectContext {
  value: string | number | readonly string[] | undefined;
  setValue: (value: SelectContext["value"]) => void;
  search: string;
  setSearch: (search: SelectContext["search"]) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: SelectContext["isOpen"]) => void;
  selectedDisplay: () => React.ReactNode;
  setSelectedDisplay: (display: SelectContext["selectedDisplay"]) => void;
}

export const SelectContext = createContext<SelectContext | null>(null);
