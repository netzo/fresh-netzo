import type { Plugin } from "../../deps/$fresh/server.ts";
import type { JSX } from "../../deps/preact.ts";
import type { NetzoState } from "../mod.ts";
import { defineConfig, unocss, type UnocssOptions } from "./plugins/unocss.ts";
import presetNetzo from "./plugins/preset-netzo.ts";
import type {
  ShadcnThemeColor,
  ThemeCSSVarsVariant,
} from "./plugins/preset-shadcn/types.ts";
import _404 from "./routes/_404.tsx";
import _500 from "./routes/_500.tsx";

export type UiConfig = UnocssOptions & {
  theme?: {
    /** The primary color to be used for UI components. */
    color?: ShadcnThemeColor | ThemeCSSVarsVariant | {
      root?: ShadcnThemeColor;
      color?: Partial<ThemeCSSVarsVariant>;
    };
    /** The border radius to be used for UI components. */
    radius?: number;
  };
};

// deno-lint-ignore ban-types
export type UiState = {};

/**
 * Plugin to add layout (nav, header, footer) and theme (colors,
 * typography, etc.) powered by UnoCSS and netzo/components.
 */
export const ui = (options?: UiConfig): Plugin<NetzoState> => {
  if (!options) return { name: "ui" };

  const uiEnabled = [
    "head",
    "nav",
    "header",
    "footer",
    "theme",
  ].some((key) => !!options?.[key]);
  if (!uiEnabled) return { name: "ui" }; // skip if ui but no plugins are set

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
    csr = true,
  } = options ?? {} as UiConfig;

  return {
    ...unocss({ options: { color, radius }, config, aot, ssr, csr }), // { name, entrypoints, renderAsync, buildStart }
    name: "ui",
    routes: [
      { path: "/_404", component: _404 },
      { path: "/_500", component: _500 },
    ],
    islands: {
      baseLocation: import.meta.url,
      paths: [
        // "../../ui/layout/footer.tsx",
        "../../ui/layout/header.tsx",
        // "../../ui/layout/nav.tsx",
        "../../ui/layout/nav.mobile.tsx",
      ],
    },
  };
};
