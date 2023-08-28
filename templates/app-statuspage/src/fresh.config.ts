import { defineConfig } from "$fresh/server.ts";
import { unocss } from "netzo/ui/plugins/mod.ts";
import unoConfig from "./uno.config.ts";

export default defineConfig({
  plugins: [
    unocss(unoConfig),
  ],
});
