import { Netzo } from "netzo/mod.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";
import { accounts } from "./routes/api/accounts.ts";
import { contacts } from "./routes/api/contacts.ts";
import { deals } from "./routes/api/deals.ts";
import { interactions } from "./routes/api/interactions.ts";
import { invoices } from "./routes/api/invoices.ts";
import { transactions } from "./routes/api/transactions.ts";

export const netzo = await Netzo({
  auth: Deno.env.get("DENO_REGION") ? { providers: { netzo: {} } } : undefined,
  api: {
    path: "/api",
    endpoints: [
      accounts,
      contacts,
      deals,
      interactions,
      invoices,
      transactions,
    ],
  },
  plugins: [unocss()],
});

if (import.meta.main) netzo.start();
