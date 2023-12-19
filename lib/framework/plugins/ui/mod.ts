import type { Plugin } from "../../../deps/$fresh/server.ts";
import type { NetzoConfig } from "../../../framework/mod.ts";
import { defineConfig, unocss, type UnocssOptions } from "./plugins/unocss.ts";
import presetNetzo from "./plugins/preset-netzo.ts";
import _App from "./routes/_app.tsx";
import _404 from "./routes/_404.tsx";
import _500 from "./routes/_500.tsx";

/**
 * Plugin to add layout (nav, header, footer) and theme (colors,
 * typography, etc.) powered by UnoCSS and netzo/components.
 */
export const ui = (options?: NetzoConfig["ui"]): Plugin => {
  const {
    color = "zinc",
    radius = 0.5,
    unocss: {
      config = defineConfig({ presets: [presetNetzo({ color, radius })] }),
      aot = true,
      ssr = true,
      csr = false,
    } = {},
  } = options ?? {} as NetzoConfig["ui"] & { unocss: UnocssOptions };
  return {
    ...unocss({ config, aot, ssr, csr }), // { name, entrypoints, renderAsync, buildStart }
    name: "ui",
    routes: [
      { path: "/_app", component: _App },
      { path: "/_404", component: _404 },
      { path: "/_500", component: _500 },
    ],
    islands: {
      baseLocation: import.meta.url,
      paths: [
        "../../../components/ui/theme-toggle.tsx",
        // "./islands/mobile-nav.tsx",
        "./islands/nav-item.tsx",
        "./islands/header.tsx",
        "./islands/footer.tsx",
      ],
    },
  };
};
