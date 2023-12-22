import type { Plugin } from "../../../deps/$fresh/server.ts";
import type { NetzoConfig } from "../../../framework/mod.ts";
import { defineConfig, unocss } from "./plugins/unocss.ts";
import presetNetzo from "./plugins/preset-netzo.ts";
import _App from "./routes/_app.tsx";
import _404 from "./routes/_404.tsx";
import _500 from "./routes/_500.tsx";

const createUnoConfig = ({ color, radius }: NetzoConfig["ui"]["theme"]) => {
  return defineConfig({ presets: [presetNetzo({ color, radius })] });
};

/**
 * WORKAROUND: esbuild drops functions when serializing plugin state
 * so passing state.config to the "main" entrypoint script for CSR
 * does not work, and the client must be able to import the config
 * from the client (during hydration), therefore we need to base64
 * encode the config and pass it as a string to the client to avoid
 * the esbuild issue of dropping functions when serializing plugin.
 * Note that both config and configCSR should be the same, so we
 * initialize both from the same options (NetzoConfig["ui"]["theme"])
 * NOTE: no need to import and declare defineConfig() (avoids import)
 */
const createUnoConfigCSR = ({ color, radius }: NetzoConfig["ui"]["theme"]) => {
  // NOTE: must import presetNetzo from absolute URL since this is ran at client
  return `import presetNetzo from "https://deno.land/x/netzo@0.3.26/framework/plugins/ui/plugins/preset-netzo.ts";

export default {
  presets: [presetNetzo({
    color: "${color}",
    radius: ${radius},
  })],
};
`;
};

/**
 * Plugin to add layout (nav, header, footer) and theme (colors,
 * typography, etc.) powered by UnoCSS and netzo/components.
 */
export const ui = (options?: NetzoConfig["ui"]): Plugin => {
  const {
    theme: {
      color = "blue",
      radius = 0.5,
    } = {},
  } = options ?? {} as NetzoConfig["ui"];
  return {
    ...unocss({
      // used by AoT and SSR modes (no need to base64 encode)
      config: createUnoConfig({ color, radius }),
      // used by CSR mode (base64 encoded for proper serialization)
      configCSR: createUnoConfigCSR({ color, radius }),
      aot: true,
      ssr: true,
      csr: true,
    }), // { name, entrypoints, renderAsync, buildStart }
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
