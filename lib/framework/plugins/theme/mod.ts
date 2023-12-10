import { JSX, options as preactOptions, VNode } from "../../../deps/preact.ts";
import {
  UnoGenerator,
  type UserConfig,
} from "https://esm.sh/@unocss/core@0.58.0?target=esnext";
import type { Theme } from "https://esm.sh/@unocss/preset-uno@0.58.0?target=esnext";
import {
  Plugin,
  type PluginRenderStyleTag,
} from "../../../deps/$fresh/src/server/mod.ts";
import {
  dirname,
  fromFileUrl,
  join,
  walk,
} from "../../../deps/$fresh/src/server/deps.ts";
import { exists } from "../../../deps/std/fs/exists.ts";
import { defineConfig, unocss } from "./plugins/unocss.ts";
import presetNetzo, { PresetNetzoOptions } from "./plugins/preset-netzo.ts";

/**
 * Plugin for theming via UnoCSS which automatically generates CSS utility classes
 */
export const theme = (options: PresetNetzoOptions = {}): Plugin => {
  return {
    ...unocss({
      config: defineConfig({ presets: [presetNetzo(options)] }),
      aot: options.aot,
      ssr: options.ssr,
      csr: options.csr,
    }),
    name: "theme", // override unocss().name
  };
};
