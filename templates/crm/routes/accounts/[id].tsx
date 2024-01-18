import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Account } from "@/database/accounts.ts";
import { FormAccount } from "@/islands/accounts/Form.tsx";
import { netzo } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new"
    ? {}
    : await netzo.db.get<Account>(["accounts", id]);

  if (!data) return ctx.renderNotFound();

  return (
    <div className="my-4 overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormAccount
              data={data}
              method="POST"
              action={`${ctx.url.origin}/api?$prefix=accounts`}
            />
          )
          : (
            <FormAccount
              data={data}
              method="PATCH"
              action={`${ctx.url.origin}/api?$key=accounts,${id}`}
            />
          )}
      </div>
    </div>
  );
});
