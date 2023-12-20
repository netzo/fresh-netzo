import type { Plugin } from "../../../deps/$fresh/server.ts";
import type { NetzoConfig } from "../../../framework/mod.ts";
import { unocss, type UnocssOptions } from "./plugins/unocss.ts";
import _App from "./routes/_app.tsx";
import _404 from "./routes/_404.tsx";
import _500 from "./routes/_500.tsx";

/**
 * Plugin to add layout (nav, header, footer) and theme (colors,
 * typography, etc.) powered by UnoCSS and netzo/components.
 */
export const ui = (
  options?: NetzoConfig["ui"] & { unocss?: UnocssOptions },
): Plugin => {
  const {
    color = "blue",
    radius = 0.5,
    unocss: { configURL, aot = true, ssr = true, csr = true } = {},
  } = options;
  return {
    ...unocss({ configURL, aot, ssr, csr }), // { name, entrypoints, renderAsync, buildStart }
    name: "ui",
    routes: [
      { path: "/_app", component: _App },
      { path: "/_404", component: _404 },
      { path: "/_500", component: _500 },
    ],
    islands: {
      baseLocation: import.meta.url,
      paths: [
        "./islands/footer.tsx",
        "./islands/header.tsx",
        "./islands/nav.tsx",
        "./islands/nav-mobile.tsx",
      ],
    },
  };
};
