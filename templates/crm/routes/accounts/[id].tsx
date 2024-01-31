import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Account } from "@/resources/accounts.ts";
import { FormAccount } from "@/islands/accounts/Form.tsx";
import { netzo } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new"
    ? {}
    : await netzo.service("accounts").get<Account>(id);

  return (
    <div className="my-4 overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormAccount
              data={data}
              method="POST"
              action={`${ctx.url.origin}/db?$prefix=accounts`}
            />
          )
          : (
            <FormAccount
              data={data}
              method="PATCH"
              action={`${ctx.url.origin}/db?$key=accounts,${id}`}
            />
          )}
      </div>
    </div>
  );
});
