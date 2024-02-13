import { defineRoute } from "$fresh/server.ts";
import type { Account } from "@/data/accounts.ts";
import type { Contact } from "@/data/contacts.ts";
import type { Deal } from "@/data/deals.ts";
import type { Interaction } from "@/data/interactions.ts";
import type { Invoice } from "@/data/invoices.ts";
import type { Transaction } from "@/data/transactions.ts";
import { Dashboard } from "@/islands/Dashboard.tsx";
import { netzo } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const data = await Promise.all([
    netzo.resource("accounts").find<Account>(),
    netzo.resource("contacts").find<Contact>(),
    netzo.resource("deals").find<Deal>(),
    netzo.resource("interactions").find<Interaction>(),
    netzo.resource("invoices").find<Invoice>(),
    netzo.resource("transactions").find<Transaction>(),
  ]);

  // if (!data) return ctx.renderNotFound();

  return <Dashboard data={data} />;
});
