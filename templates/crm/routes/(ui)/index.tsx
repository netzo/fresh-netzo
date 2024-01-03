import { defineRoute } from "$fresh/server.ts";
import type { Account } from "@/data/accounts.schema.ts";
import type { Deal } from "@/data/deals.schema.ts";
import type { Contact } from "@/data/contacts.schema.ts";
import type { Invoice } from "@/data/invoices.schema.ts";
import { Overview } from "@/islands/Overview.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const data = await Promise.all([
    app.db.find<Account>("accounts"),
    app.db.find<Deal>("deals"),
    app.db.find<Contact>("contacts"),
    app.db.find<Invoice>("invoices"),
  ]);

  if (!data) return ctx.renderNotFound();

  return <Overview />;
});
