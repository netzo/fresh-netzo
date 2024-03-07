import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import { PageAccounts } from "../../islands/accounts.tsx";
import { $api } from "../../plugins/api.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const accounts = await $api.accounts.find() as Account[];

  // render entire page as island for simplicity
  return <PageAccounts accounts={accounts} />;
});
