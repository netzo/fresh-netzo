import { defineConfig } from "$fresh/server.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";

export default defineConfig({
  plugins: [unocss()],
});
