import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Account } from "@/components/tables/accounts/data/schema.ts";
import { FormAccount } from "@/islands/accounts/Form.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new" ? {} : await app.db.get<Account>("accounts", id);

  if (!data) return ctx.renderNotFound();

  const url = id === "new"
    ? `${ctx.url.origin}/api/accounts`
    : `${ctx.url.origin}/api/accounts/${id}`;

  return (
    <div className="my-4 overflow-auto">
      <Separator></Separator>
      <div className="p-10 max-w-500px">
        <FormAccount
          data={data}
          method={id === "new" ? "POST" : "PATCH"}
          url={url}
        />
      </div>
    </div>
  );
});
