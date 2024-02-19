import { defineConfig } from "netzo/mod.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";
import unoConfig from "./uno.config.ts";

export default defineConfig({
  plugins: [
    unocss({ config: unoConfig }),
  ],
});
