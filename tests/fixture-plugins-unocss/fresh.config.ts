import { defineConfig } from "@fresh/core";
import { unocss } from "netzo/plugins/unocss/plugin.ts";
import unocssConfig from "./uno.config.ts";

export default defineConfig({
  plugins: [
    unocss(unocssConfig),
  ],
});
