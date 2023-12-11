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
import type { Project } from "../../../framework/mod.ts";
import { defineConfig, unocss } from "./plugins/unocss.ts";
import presetNetzo, { PresetNetzoOptions } from "./plugins/preset-netzo.ts";

export type ThemeOptions = Project["config"]["theme"] & PresetNetzoOptions;

export type ThemeState = {};

export const theme = (options: ThemeOptions = {}): Plugin => {
  let { config, aot, ssr, csr, color, radius } = options;
  config ??= defineConfig({ presets: [presetNetzo({ color, radius })] });
  return {
    ...unocss({ config, aot, ssr, csr }),
    name: "theme",
  };
};
