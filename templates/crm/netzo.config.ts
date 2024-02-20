import { defineConfig } from "netzo/mod.ts";
import * as netzo from "netzo/plugins/mod.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";
import * as endpoints from "./routes/api/mod.ts";
import unoConfig from "./uno.config.ts";

// server-side: use server-only $client object ($ = server-only).
// client-side: use fetch() or custom createApi() client.
export const $client = {
  accounts: endpoints.accounts.resource,
  contacts: endpoints.contacts.resource,
  deals: endpoints.deals.resource,
  interactions: endpoints.interactions.resource,
  invoices: endpoints.invoices.resource,
  transactions: endpoints.transactions.resource,
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
        endpoints.interactions,
        endpoints.invoices,
        endpoints.transactions,
        endpoints.teamMembers,
      ],
    }),
    unocss({ config: unoConfig }),
  ],
});
