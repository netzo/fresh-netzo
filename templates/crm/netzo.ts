import { createNetzoApp } from "netzo/mod.ts";
import * as netzo from "netzo/plugins/mod.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";
import { accounts } from "./routes/api/accounts.ts";
import { contacts } from "./routes/api/contacts.ts";
import { deals } from "./routes/api/deals.ts";
import { interactions } from "./routes/api/interactions.ts";
import { invoices } from "./routes/api/invoices.ts";
import { transactions } from "./routes/api/transactions.ts";

export const resource = (name: string) =>
  ({
    accounts,
    contacts,
    deals,
    interactions,
    invoices,
    transactions,
  })?.[name]?.resource;

const app = await createNetzoApp({
  plugins: [
    netzo.environments(),
    netzo.auth(
      Deno.env.get("DENO_REGION") ? { providers: { netzo: {} } } : undefined,
    ),
    netzo.api({
      path: "/api",
      endpoints: [
        accounts,
        contacts,
        deals,
        interactions,
        invoices,
        transactions,
      ],
    }),
    unocss(),
  ],
});

if (import.meta.main) app.start();
