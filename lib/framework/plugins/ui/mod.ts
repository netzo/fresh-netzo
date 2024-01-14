import type { Plugin } from "../../../deps/$fresh/server.ts";
import { defineConfig, unocss, type UnocssOptions } from "./plugins/unocss.ts";
import presetNetzo from "./plugins/preset-netzo.ts";
import type {
  ShadcnThemeColor,
  ThemeCSSVarsVariant,
} from "./plugins/preset-shadcn/types.ts";
import _App from "./routes/_app.tsx";
import _404 from "./routes/_404.tsx";
import _500 from "./routes/_500.tsx";

export type UiConfig = UnocssOptions & {
  head?: {
    /** A short title for the app to be used in head of the page. */
    title?: string;
    /** A short description for the app to be used in head of the page. */
    description?: string;
    /** An https or data URL of the favicon to be shown in browser tabs */
    favicon?: string;
    /** An https or data URL of a cover image shown when sharing the link */
    image?: string;
  };
  nav?: {
    /** A short title for the app at the navigation drawer. */
    title?: string;
    /** An https or data URL of a cover image at the navigation drawer */
    image?: string;
    /** Navigation headers, links with absolute or relative URLs and/or dividers */
    items?: Array<
      | { text: string } // header
      | { icon?: string; text: string; href?: string; target?: string } // link
      | Record<string | number | symbol, never> // divider (empty object)
    >;
  };
  header?: {
    /** A short title for the app at the header. */
    title?: string;
    /** A short description for the app at the header. */
    description?: string;
    /** An https or data URL of a cover image at the header */
    image?: string;
  };
  footer?: {
    /** HTML content to be rendered at the left side of the footer. */
    innerHTMLLeft?: string;
    /** HTML content to be rendered at the right side of the footer. */
    innerHTMLRight?: string;
  };
  theme?: {
    /** The primary color to be used for UI components. */
    color?: ShadcnThemeColor | ThemeCSSVarsVariant | {
      base?: ShadcnThemeColor;
      color?: Partial<ThemeCSSVarsVariant>;
    };
    /** The border radius to be used for UI components. */
    radius?: number;
  };
};

/**
 * Plugin to add layout (nav, header, footer) and theme (colors,
 * typography, etc.) powered by UnoCSS and netzo/components.
 */
export const ui = (options: UiConfig): Plugin => {
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
        "./islands/nav.mobile.tsx",
        "./islands/nav-item.tsx",
      ],
    },
  };
};
