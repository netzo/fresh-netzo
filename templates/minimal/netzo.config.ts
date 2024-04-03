import { defineConfig } from "netzo/mod.ts";
import * as netzo from "netzo/plugins/mod.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";
import unocssConfig from "./unocss.config.ts";

export default defineConfig({
  plugins: [
    netzo.rest({
      apiKey: Deno.env.get("NETZO_API_KEY"),
      collections: [{ name: "users"}],
    }),
    unocss(unocssConfig),
  ],
});
