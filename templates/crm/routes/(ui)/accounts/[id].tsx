import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Account } from "@/data/accounts.ts";
import { FormAccount } from "@/islands/accounts/Form.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new" ? {} : await app.db.get<Account>(["accounts", id]);

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
              url={`${ctx.url.origin}/api?$prefix=accounts`}
            />
          )
          : (
            <FormAccount
              data={data}
              method="POST"
              url={`${ctx.url.origin}/api?$key=accounts,${id}`}
            />
          )}
      </div>
    </div>
  );
});
