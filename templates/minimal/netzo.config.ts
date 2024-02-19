import { defineConfig } from "netzo/mod.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";

export default defineConfig({
  plugins: [
    unocss(),
  ],
});
