import { sv } from "./sv/index.ts";
import { en } from "./en/index.ts";
import type { InitOptions } from "i18next";
import i18next from "i18next";

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

const options = {
  fallbackLng: "en" as const,
  debug: true,
  resources: {
    en: { translation: en },
    sv: { translation: sv },
  },
} satisfies InitOptions;

export const supported = new Set([
  options.fallbackLng,
  ...Object.keys(options.resources),
]);
export const fallback = options.fallbackLng;

export async function init() {
  await i18next.init(options);
}
