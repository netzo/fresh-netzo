import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import * as AccountsIslands from "../../islands/accounts.tsx";
import { $client } from "../../netzo.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const data = await $client.accounts.find() as Account[];

  return (
    <div className="h-screen overflow-y-auto p-4">
      <AccountsIslands.Table data={data} />
    </div>
  );
});
