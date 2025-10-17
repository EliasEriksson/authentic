import { useQuery } from "@tanstack/react-query";
import { translations } from "../../translations/index.ts";
const queryKey = "language";
import i18next from "i18next";

function getBrowserLanguage() {
  const locale = (() => {
    try {
      return new Intl.Locale(window.navigator.language);
    } catch {
      return undefined;
    }
  })();
  return locale && translations.language.supported.has(locale.language)
    ? locale.language
    : translations.language.fallback;
}

export const useLanguage = () => {
  return (({ data, ...query }) => ({ language: data, ...query }))(
    useQuery({
      queryKey: [queryKey],
      placeholderData: () => {
        const language = getBrowserLanguage();
        if (i18next.language !== language) {
          i18next.changeLanguage(language).then();
        }
        return language;
      },
      queryFn: async () => {
        return getBrowserLanguage();
      },
    }),
  );
};
