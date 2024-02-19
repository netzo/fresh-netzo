import { createApi } from "netzo/integrations/create-api/mod.ts";
import { defineConfig } from "netzo/mod.ts";
import * as netzo from "netzo/plugins/mod.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";
import * as endpoints from "./routes/api/mod.ts";
import unoConfig from "./uno.config.ts";

export const api = createApi({
  baseURL: "http://localhost:8000/api",
  headers: {
    "content-type": "application/json",
    "x-api-key": Deno.env.get("NETZO_API_KEY")!,
  },
});

export default defineConfig({
  plugins: [
    netzo.environments(),
    // netzo.auth({ providers: { netzo: {} } }),
    netzo.api({
      path: "/api",
      endpoints: [
        endpoints.accounts,
        endpoints.contacts,
        endpoints.deals,
        endpoints.interactions,
        endpoints.invoices,
        endpoints.transactions,
      ],
    }),
    unocss({ config: unoConfig }),
  ],
});
