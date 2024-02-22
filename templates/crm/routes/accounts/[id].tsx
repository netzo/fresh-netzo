import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Account as TData } from "../../data/accounts.ts";
import * as Account from "../../islands/account.tsx";
import { $client } from "../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = (id === "new" ? {} : await $client.accounts.get(id)) as TData;

  return (
    <div className="overflow-auto">
      <Separator />
      <Account.Header data={data} />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <Account.CardFormMain
              data={data}
              method="POST"
              action={`/api/accounts`}
            />
          )
          : (
            <Account.CardFormMain
              data={data}
              method="PATCH"
              action={`/api/accounts/${id}`}
            />
          )}
      </div>
    </div>
  );
});
