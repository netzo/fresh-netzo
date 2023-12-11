import { Plugin } from "../../../deps/$fresh/src/server/mod.ts";
import type { Project } from "../../../framework/mod.ts";
import { defineConfig, unocss } from "./plugins/unocss.ts";
import presetNetzo, { PresetNetzoOptions } from "./plugins/preset-netzo.ts";

export type ThemeOptions = Project["config"]["theme"] & PresetNetzoOptions;

// deno-lint-ignore ban-types
export type ThemeState = {};

export const theme = (options: ThemeOptions = {}): Plugin => {
  let { config, aot, ssr, csr, color, radius } = options;
  console.log("theme", options);
  config ??= defineConfig({ presets: [presetNetzo({ color, radius })] });
  return {
    ...unocss({ config, aot, ssr, csr }),
    name: "theme",
  };
};
