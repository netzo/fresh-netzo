import { defineConfig } from "netzo/modules/unocss/mod.ts";
import { presetNetzo } from "netzo/modules/unocss/preset-netzo.ts";

export default defineConfig({
  selfURL: import.meta.url,
  presets: [presetNetzo()],
});
