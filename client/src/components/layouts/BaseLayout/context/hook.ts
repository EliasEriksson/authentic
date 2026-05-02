import { useContext } from "react";
import { SidebarContext } from "./index.ts";

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("SidebarProvider not found.");
  return context;
}
