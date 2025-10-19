import i18next from "i18next";
import { useLanguage } from "./language/index.ts";

export const useTranslator = () => {
  const language = useLanguage();
  if (language.data == undefined)
    return {
      data: undefined,
      ...(({ data: _, ...query }) => query)(language),
    };
  return {
    data: (...key: string[]) => {
      return i18next.t(key.join("."));
    },
    ...(({ data: _, ...query }) => query)(language),
  };
};
