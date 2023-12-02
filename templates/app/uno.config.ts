import { defineConfig } from "https://raw.githubusercontent.com/adamgreg/fresh_unocss/d3fb5f6a343c67c876f0a2c070e5d98458ddcb19/plugins/unocss.ts";
import presetUno from "@unocss/preset-uno";

export default defineConfig({
  aot: true,
  ssr: true,
  csr: true,
  presets: [presetUno()],
  selfURL: import.meta.url,
});
