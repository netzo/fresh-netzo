import { Plugin } from "../../../deps/$fresh/src/server/mod.ts";
import type { Project } from "../../../framework/mod.ts";
import { defineConfig, unocss, type UnocssOptions } from "./plugins/unocss.ts";
import presetNetzo from "./plugins/preset-netzo.ts";

export type ThemeOptions = Project["config"]["theme"] & {
  unocss: UnocssOptions;
};

// deno-lint-ignore ban-types
export type ThemeState = {};

export const theme = (options: ThemeOptions): Plugin => {
  const {
    color,
    radius,
    unocss: {
      config = defineConfig({ presets: [presetNetzo({ color, radius })] }),
      aot = true,
      ssr = true,
      csr = false,
    } = {},
  } = options ?? {} as ThemeOptions;
  return {
    ...unocss({ config, aot, ssr, csr }),
    name: "theme",
  };
};
