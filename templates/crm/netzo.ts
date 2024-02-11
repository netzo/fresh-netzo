import { Netzo } from "netzo/mod.ts";
import { accounts } from "./resources/accounts.ts";
import { contacts } from "./resources/contacts.ts";
import { deals } from "./resources/deals.ts";
import { interactions } from "./resources/interactions.ts";
import { invoices } from "./resources/invoices.ts";
import { transactions } from "./resources/transactions.ts";

export const netzo = await Netzo({
  // auth: Deno.env.get("DENO_REGION") ? { providers: { netzo: {} } } : undefined,
  api: {
    // apiKey: Deno.env.get("NETZO_API_KEY"),
    path: "/api",
    endpoints: {
      accounts,
      contacts,
      deals,
      interactions,
      invoices,
      transactions,
    },
  },
  components: {},
});

if (import.meta.main) netzo.start();
