import { netzodb } from "netzo/integrations/databases/netzodb.ts";
import { defineConfig } from "netzo/mod.ts";
import * as netzo from "netzo/plugins/mod.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";
import unocssConfig from "./unocss.config.ts";

export const db = netzodb();

export default defineConfig({
  plugins: [
    netzo.environments(),
    netzo.api({
      apiKey: Deno.env.get("NETZO_API_KEY"),
      collections: [
        { name: "accounts", idField: "id" },
        { name: "activities", idField: "id" },
        { name: "contacts", idField: "id" },
        { name: "deals", idField: "id" },
      ],
    }),
    // netzo.auth({ providers: { netzo: {} } }),
    unocss(unocssConfig),
  ],
});
