import { defineRoute } from "$fresh/server.ts";
import type { Account } from "@/services/accounts.ts";
import type { Contact } from "@/services/contacts.ts";
import type { Deal } from "@/services/deals.ts";
import type { Interaction } from "@/services/interactions.ts";
import type { Invoice } from "@/services/invoices.ts";
import type { Transaction } from "@/services/transactions.ts";
import { Dashboard } from "@/islands/Dashboard.tsx";
import { netzo } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const data = await Promise.all([
    netzo.service("accounts").find<Account>(),
    netzo.service("contacts").find<Contact>(),
    netzo.service("deals").find<Deal>(),
    netzo.service("interactions").find<Interaction>(),
    netzo.service("invoices").find<Invoice>(),
    netzo.service("transactions").find<Transaction>(),
  ]);

  // if (!data) return ctx.renderNotFound();

  return <Dashboard data={data} />;
});
