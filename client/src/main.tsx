import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./router.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { state } from "./state/index.ts";
import { translations } from "./translations/index.ts";

import "./colors.scss";

(async () => {
  await translations.init();
  const rootElement = document.getElementById("root");
  if (rootElement && !rootElement.innerHTML) {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <QueryClientProvider client={state.client}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StrictMode>,
    );
  }
})();
