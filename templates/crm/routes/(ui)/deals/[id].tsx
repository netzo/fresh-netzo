import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Deal } from "@/components/data/deals.ts";
import type { FormDeal } from "@/islands/deals/FormDeal.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new" ? {} : await app.db.get<Deal>("deals", id);
  if (!data) return ctx.renderNotFound();

  const url = id === "new"
    ? `${ctx.url.origin}/api/deals`
    : `${ctx.url.origin}/api/deals/${id}`;

  return (
    <div className="my-4 overflow-auto">
      <Separator></Separator>
      <div className="p-10 max-w-500px">
        <FormDeal
          data={data}
          method={id === "new" ? "POST" : "PATCH"}
          url={url}
        />
      </div>
    </div>
  );
});
