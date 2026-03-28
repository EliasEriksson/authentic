import { useContext } from "react";
import { GroupSelectContext, SelectContext } from "./index.ts";

export function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) throw new Error("SelectContext not found.");
  return context;
}

export function useGroupSelectContext() {
  return useContext(GroupSelectContext);
}
