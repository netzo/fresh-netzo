import { defineConfig } from "netzo/mod.ts";
import * as netzo from "netzo/plugins/mod.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";
import * as endpoints from "./routes/api/mod.ts";
import unoConfig from "./uno.config.ts";

// server-side: use server-only $client object ($ = server-only).
// client-side: use fetch() or custom createApi() client.
export const $client = {
  // denokv:
  accounts: endpoints.accounts.resource,
  contacts: endpoints.contacts.resource,
  deals: endpoints.deals.resource,
  users: endpoints.users.resource,
  // custom:
  metrics: endpoints.metrics.resource,
};

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
        endpoints.users,
        endpoints.metrics,
      ],
    }),
    unocss({ config: unoConfig }),
  ],
});
