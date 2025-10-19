import { useQuery, useMutation } from "@tanstack/react-query";
import { languages } from "../languages/index.ts";
import { client } from "../../client.ts";
import i18next from "i18next";

function queryKey() {
  return ["language"] as const;
}

function localStorageKey() {
  return queryKey().join(".");
}

function readLocalStorage() {
  return localStorage.getItem(localStorageKey());
}

function writeLocalStorage(language: string) {
  localStorage.setItem(localStorageKey(), language);
}

function getBrowserLanguage() {
  const localLanguage = readLocalStorage();
  if (localLanguage) return localLanguage;
  const locale = (() => {
    try {
      return new Intl.Locale(navigator.language);
    } catch {
      return undefined;
    }
  })();
  return locale && languages.supported.has(locale.language)
    ? locale.language
    : languages.fallback;
}

export const useChangeLanguage = () => {
  const { mutate, mutateAsync, ...context } = useMutation({
    mutationFn: async (language: string) => {
      const io = Promise.all([i18next.changeLanguage(language)]);
      writeLocalStorage(language);
      await io;
      return language;
    },
    onSuccess: (language) => {
      client.setQueryData(queryKey(), language);
    },
  });
  return Object.assign(mutate, { ...context, async: mutateAsync });
};

export const useLanguage = () => {
  const changeLanguage = useChangeLanguage();
  return (({ data, ...query }) => ({ data, ...query }))(
    useQuery({
      queryKey: queryKey(),
      placeholderData: () => {
        const language = getBrowserLanguage();
        if (i18next.language !== language) changeLanguage(language);
        return language;
      },
      queryFn: async () => {
        const language = getBrowserLanguage();
        if (i18next.language !== language) changeLanguage(language);
        return language;
      },
    }),
  );
};
