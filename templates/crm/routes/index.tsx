import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../data/accounts.ts";
import type { Contact } from "../data/contacts.ts";
import type { Deal } from "../data/deals.ts";
import type { Interaction } from "../data/interactions.ts";
import type { Invoice } from "../data/invoices.ts";
import type { Transaction } from "../data/transactions.ts";
import { Dashboard } from "../islands/Dashboard.tsx";
import { resource } from "../netzo.ts";

export default defineRoute(async (req, ctx) => {
  const data = await Promise.all([
    resource("accounts").find<Account>(),
    resource("contacts").find<Contact>(),
    resource("deals").find<Deal>(),
    resource("interactions").find<Interaction>(),
    resource("invoices").find<Invoice>(),
    resource("transactions").find<Transaction>(),
  ]);

  // if (!data) return ctx.renderNotFound();

  return <Dashboard data={data} />;
});
