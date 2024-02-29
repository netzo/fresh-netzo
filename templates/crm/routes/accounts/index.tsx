import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import * as AccountsIslands from "../../islands/accounts.tsx";
import { $client } from "../../netzo.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const data = await $client.accounts.find() as Account[];

  return (
    <div className="flex flex-col space-y-4 py-4 h-screen">
      <AccountsIslands.Main data={data} />
    </div>
  );
});
