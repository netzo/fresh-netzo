import { defineConfig } from "netzo/plugins/unocss/mod.ts";
import { presetNetzo } from "netzo/ui/unocss.ts";

export default defineConfig({
  presets: [presetNetzo()],
  selfURL: import.meta.url,
});
