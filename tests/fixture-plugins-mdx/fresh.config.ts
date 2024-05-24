import { defineConfig } from "fresh/server.ts";
import { mdx } from "netzo/plugins/mdx/plugin.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";
import unocssConfig from "./unocss.config.ts";

export default defineConfig({
  plugins: [
    await mdx({ configURL: import.meta.url }),
    unocss(unocssConfig),
  ],
});
