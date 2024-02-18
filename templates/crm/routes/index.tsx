import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../data/accounts.ts";
import type { Contact } from "../data/contacts.ts";
import type { Deal } from "../data/deals.ts";
import type { Interaction } from "../data/interactions.ts";
import type { Invoice } from "../data/invoices.ts";
import type { Team } from "../data/team.ts";
import type { Transaction } from "../data/transactions.ts";
import { Dashboard } from "../islands/Dashboard.tsx";
import { api } from "../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const data = await Promise.all([
    api.accounts.get<Account[]>(),
    api.contacts.get<Contact[]>(),
    api.deals.get<Deal[]>(),
    api.interactions.get<Interaction[]>(),
    api.invoices.get<Invoice[]>(),
    api.transactions.get<Transaction[]>(),
    api.team.get<Team[]>(),
  ]);

  // if (!data) return ctx.renderNotFound();

  return <Dashboard data={data} />;
});
