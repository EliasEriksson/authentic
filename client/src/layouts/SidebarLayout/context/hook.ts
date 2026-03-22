import { useContext } from "react";
import { Context } from "./context.ts";

export function useSidebar() {
  const context = useContext(Context);
  if (!context) throw new Error("SidebarProvider not found.");
  return context;
}
