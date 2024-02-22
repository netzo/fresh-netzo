import { defineRoute } from "$fresh/server.ts";
import type { Account as TData } from "../../data/accounts.ts";
import * as Account from "../../islands/accounts.tsx";
import { $client } from "../../netzo.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const data = await $client.accounts.find() as TData[];

  return (
    <div className="h-full p-4">
      <Account.Table data={data} />
    </div>
  );
});
