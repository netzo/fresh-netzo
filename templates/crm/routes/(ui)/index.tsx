import { defineRoute } from "$fresh/server.ts";
import type { Account } from "@/components/tables/accounts/data/schema.ts";
import type { Contact } from "@/components/tables/contacts/data/schema.ts";
import type { Invoice } from "@/components/tables/invoices/data/schema.ts";
import { Home } from "@/islands/Home.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const data = await Promise.all([
    app.db.find<Account>("accounts"),
    app.db.find<Contact>("contacts"),
    app.db.find<Invoice>("invoices"),
  ]);

  if (!data) return ctx.renderNotFound();

  return <Home />;
});
