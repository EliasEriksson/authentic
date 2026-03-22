import { createContext } from "react";

export interface SidebarContext {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
export const SidebarContext = createContext<SidebarContext | null>(null);
