import { useContext } from "react";
import { SelectContext } from "./index.ts";

export function useSidebar() {
  const context = useContext(SelectContext);
  if (!context) throw new Error("SelectContext not found.");
  return context;
}
