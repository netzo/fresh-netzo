import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Account } from "../../data/accounts.ts";
import { FormAccount } from "../../islands/accounts/Form.tsx";
import { $client } from "../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new" ? {} : await $client.accounts.get(id) as Account;

  return (
    <div className="my-4 overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormAccount
              data={data}
              method="POST"
              action={`/api/accounts`}
            />
          )
          : (
            <FormAccount
              data={data}
              method="PATCH"
              action={`/api/accounts/${id}`}
            />
          )}
      </div>
    </div>
  );
});
