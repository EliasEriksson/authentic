import { useRef } from "react";

export function useUUID() {
  const uuid = useRef<ReturnType<typeof crypto.randomUUID> | null>(null);
  if (!uuid.current) uuid.current = crypto.randomUUID();
  return uuid.current;
}
