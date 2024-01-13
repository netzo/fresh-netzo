import { defineRoute } from "$fresh/server.ts";
// import type { Account, ALIASES } from "@/data/accounts.ts";
// import type { Deal, ALIASES } from "@/data/deals.ts";
// import type { Contact, ALIASES } from "@/data/contacts.ts";
// import type { Invoice, ALIASES } from "@/data/invoices.ts";
import { Overview } from "@/islands/Overview.tsx";
// import { netzo } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  // const data = await Promise.all([
  //   netzo.db.find<Account>(["accounts"]),
  //   netzo.db.find<Deal>(["deals"]),
  //   netzo.db.find<Contact>(["contacts"]),
  //   netzo.db.find<Invoice>(["invoices"]),
  // ]);

  // if (!data) return ctx.renderNotFound();

  return <Overview />;
});
