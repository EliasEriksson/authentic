import i18next from "i18next";
import { sv } from "./sv/index.ts";
import { en } from "./en/index.ts";

type AllObjectsHaveSameShape<T extends readonly object[]> = T extends [
  infer First,
  ...infer Rest,
]
  ? Rest extends object[]
    ? First extends object
      ? Rest[number] extends First
        ? First extends Rest[number]
          ? T
          : never
        : never
      : never
    : T
  : T;
(<T extends object[]>(..._: AllObjectsHaveSameShape<T>) => {})(sv, en);

const fallback = "en" as const;
const supported = new Set([fallback, "sv"]);
export const language = { fallback, supported };

export async function init() {
  await i18next.init({
    fallbackLng: language.fallback,
    debug: true,
    resources: {
      en: { translation: en },
      sv: { translation: sv },
    },
  });
}
