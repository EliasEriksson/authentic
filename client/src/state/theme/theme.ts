import { useQuery, useMutation } from "@tanstack/react-query";
import { client } from "../client.ts";
import select from "../../components/Select";

function queryKey() {
  return ["theme"] as const;
}

function localStorageKey() {
  return queryKey().join(".");
}

function readLocalStorage() {
  return localStorage.getItem(localStorageKey());
}

function writeLocalStorage(theme: string) {
  localStorage.setItem(localStorageKey(), theme);
}

export const fallback = "auto" as const;
export const supported = new Set([fallback, "dark", "light"]);

function getLocalTheme() {
  const localTheme = readLocalStorage();
  return localTheme && supported.has(localTheme) ? localTheme : fallback;
}

export const useChangeTheme = () => {
  const { mutate, mutateAsync, ...context } = useMutation({
    mutationFn: async (theme: string) => {
      writeLocalStorage(theme);
      return theme;
    },
    onSuccess: (theme) => {
      client.setQueryData(queryKey(), theme);
    },
  });
  return Object.assign(mutate, { ...context, async: mutateAsync });
};

export const useTheme = () => {
  return (({ data, ...context }) => ({ data, ...context }))(
    useQuery({
      queryKey: queryKey(),
      placeholderData: () => {
        return getLocalTheme();
      },
      queryFn: async () => {
        return getLocalTheme();
      },
    }),
  );
};

export function init() {
  const selected = readLocalStorage();
  if (selected === fallback || !selected) {
    for (const theme of supported) {
      document.documentElement.classList.remove(theme);
    }
  } else {
    const removals: string[] = [];
    for (const theme of supported) {
      if (
        theme !== selected &&
        document.documentElement.classList.contains(theme)
      )
        removals.push(theme);
    }
    for (const theme of removals) {
      document.documentElement.classList.remove(theme);
    }
    if (!document.documentElement.classList.contains(selected)) {
      document.documentElement.classList.add(selected);
    }
  }
}
