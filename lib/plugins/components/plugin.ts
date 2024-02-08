import type { Plugin } from "../../deps/$fresh/server.ts";
import { defineConfig, unocss, type UnocssOptions } from "../unocss/plugin.ts";
import presetNetzo from "../unocss/preset-netzo.ts";
import type {
  ShadcnThemeColor,
  ThemeCSSVarsVariant,
} from "../unocss/preset-shadcn/types.ts";

export type ComponentsConfig = UnocssOptions & {
  theme?: {
    /** The primary color to be used for components. */
    color?: ShadcnThemeColor | ThemeCSSVarsVariant | {
      root?: ShadcnThemeColor;
      color?: Partial<ThemeCSSVarsVariant>;
    };
    /** The border radius to be used for components. */
    radius?: number;
  };
};

// deno-lint-ignore ban-types
export type ComponentsState = {};

/**
 * Plugin to apply theme and styles to components.
 */
export const components = (options?: ComponentsConfig): Plugin => {
  if (!options) return { name: "components" };

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
  } = options ?? {} as ComponentsConfig;

  return {
    ...unocss({ options: { color, radius }, config, aot, ssr, csr }), // { name, entrypoints, renderAsync, buildStart }
    name: "components",
    islands: {
      baseLocation: import.meta.url,
      paths: [
        "../../components/layout/footer.tsx",
        "../../components/layout/header.tsx",
        "../../components/layout/nav.tsx",
        "../../components/layout/nav.mobile.tsx",
      ],
    },
  };
};
