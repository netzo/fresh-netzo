import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Account as TData } from "../../../data/accounts.ts";
import * as Account from "../../../islands/account.tsx";
import { $client } from "../../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = await $client.accounts.get(id) as TData;

  return (
    <div className="overflow-auto">
      <Separator />
      <Account.Header id={id} data={data} />
      <Account.Content id={id} data={data} />
    </div>
  );
});
