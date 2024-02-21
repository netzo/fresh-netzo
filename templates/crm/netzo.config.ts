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
  quotes: endpoints.quotes.resource,
  products: endpoints.products.resource,
  transactions: endpoints.transactions.resource,
  users: endpoints.users.resource,
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
        endpoints.quotes,
        endpoints.products,
        endpoints.transactions,
        endpoints.users,
      ],
    }),
    unocss({ config: unoConfig }),
  ],
});
