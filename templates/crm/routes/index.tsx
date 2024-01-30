import { defineRoute } from "$fresh/server.ts";
// import type { Account, ALIASES } from "@/resources/accounts.ts";
// import type { Deal, ALIASES } from "@/resources/deals.ts";
// import type { Contact, ALIASES } from "@/resources/contacts.ts";
// import type { Invoice, ALIASES } from "@/resources/invoices.ts";
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
