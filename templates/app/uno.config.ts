import { defineConfig } from "netzo/plugins/unocss/mod.ts";
import presetUno from "@unocss/preset-uno";

export default defineConfig({
  presets: [presetUno()],
  selfURL: import.meta.url,
});
