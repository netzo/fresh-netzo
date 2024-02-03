import { defineRoute } from "$fresh/server.ts";
// import type { Account, ALIASES } from "@/services/accounts.ts";
// import type { Deal, ALIASES } from "@/services/deals.ts";
// import type { Contact, ALIASES } from "@/services/contacts.ts";
// import type { Invoice, ALIASES } from "@/services/invoices.ts";
import { Overview } from "@/islands/Overview.tsx";
// import { netzo } from "@/netzo.ts";

export default defineRoute((req, ctx) => {
  // const data = await Promise.all([
  //   netzo.service("accounts").find<Account>(),
  //   netzo.service("deals").find<Deal>(),
  //   netzo.service("contacts").find<Contact>(),
  //   netzo.service("invoices").find<Invoice>(),
  // ]);

  // if (!data) return ctx.renderNotFound();

  return <Overview />;
});
