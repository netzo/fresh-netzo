import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Deal } from "../../data/deals.ts";
import { FormDeal } from "../../islands/deal.tsx";
import { $client } from "../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = await $client.deals.get(id) as Deal;

  return (
    <div className="overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormDeal
              data={data}
              method="POST"
              action={`/api/deals`}
            />
          )
          : (
            <FormDeal
              data={data}
              method="PATCH"
              action={`/api/deals/${id}`}
            />
          )}
      </div>
    </div>
  );
});
