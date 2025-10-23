import { useQuery, useMutation } from "@tanstack/react-query";
import { client } from "../client.ts";

function queryKey() {
  return ["sidebar"] as const;
}
function localStorageKey() {
  return queryKey().join(".");
}
function readLocalStorage(): boolean {
  return !!JSON.parse(localStorage.getItem(localStorageKey()) ?? "false");
}
function writeLocalStorage(value: boolean) {
  localStorage.setItem(localStorageKey(), JSON.stringify(value));
}

export const useChangeSidebar = () => {
  const { mutate, mutateAsync, ...context } = useMutation({
    mutationFn: (open: boolean) => {
      writeLocalStorage(open);
      return Promise.resolve(open);
    },
    onSuccess: (open) => {
      client.setQueryData(queryKey(), open);
    },
  });
  return Object.assign(mutate, { ...context, async: mutateAsync });
};

export const useSidebar = () => {
  return (({ data, ...context }) => ({ data, ...context }))(
    useQuery({
      queryKey: queryKey(),
      staleTime: Infinity,
      initialData: readLocalStorage(),
      queryFn: () => {
        return readLocalStorage();
      },
    }),
  );
};
