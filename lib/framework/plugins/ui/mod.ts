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
export const ui = (options?: NetzoConfig["ui"] & UnocssOptions): Plugin => {
  const {
    theme: { color = "blue", radius = 0.5 } = {},
    // inlined config is used by AoT and SSR modes, however CSR mode requires injecting
    // the inlined config via plugin `state.config` which is serialized by esbuild
    // with the current known issue of not supporting `Function` type, so any
    // functions (e.g. preflight.[].getCSS() functions) are dropped in serialization.
    // Any attempt to circumvent this issue by serializing in any other way has failed,
    // so far. Importing from a base64 encoded module works in development but fails in
    // production (e.g. `import(`data:text/javascript;base64,${btoa(unoConfigString)}`)
    config = defineConfig({ presets: [presetNetzo({ color, radius })] }),
    aot = true,
    ssr = true,
    csr = false,
  } = options ?? {} as NetzoConfig["ui"] & UnocssOptions;
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
        "./islands/footer.tsx",
        "./islands/header.tsx",
        "./islands/nav.tsx",
        "./islands/nav-mobile.tsx",
      ],
    },
  };
};
