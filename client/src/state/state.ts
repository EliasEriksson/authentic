export { client } from "./client.ts";
export * as translator from "./translator/index.ts";
export * as theme from "./theme/index.ts";
export * as sidebar from "./sidebar";
export { useTranslator } from "./translator/index.ts";
export { useTheme, useChangeTheme } from "./theme/index.ts";
export { useSidebar, useChangeSidebar } from "./sidebar";

import { init as theme } from "./theme/index.ts";
import { init as translator } from "./translator/languages/index.ts";

export async function init() {
  const io = Promise.all([translator()]);
  theme();
  await io;
}
