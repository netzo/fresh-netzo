import { defineRoute } from "$fresh/server.ts";
// import type { Account, I18N } from "@/services/accounts.ts";
// import type { Deal, I18N } from "@/services/deals.ts";
// import type { Contact, I18N } from "@/services/contacts.ts";
// import type { Invoice, I18N } from "@/services/invoices.ts";
import { Dashboard } from "@/islands/Dashboard.tsx";
// import { netzo } from "@/netzo.ts";

export default defineRoute((req, ctx) => {
  // const data = await Promise.all([
  //   netzo.service("accounts").find<Account>(),
  //   netzo.service("deals").find<Deal>(),
  //   netzo.service("contacts").find<Contact>(),
  //   netzo.service("invoices").find<Invoice>(),
  // ]);

  // if (!data) return ctx.renderNotFound();

  return <Dashboard />;
});
