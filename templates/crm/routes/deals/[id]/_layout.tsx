import { defineLayout } from "$fresh/server.ts";
import { NavLink } from "netzo/components/nav-link.tsx";
import { Separator } from "netzo/components/separator.tsx";
import type { NetzoState } from "netzo/mod.ts";
import type { Deal, Deal as TDeal } from "../../../data/deals.ts";
import { DealHeader } from "../../../islands/deal.tsx";
import { $client } from "../../../netzo.config.ts";

export type DealState = NetzoState & {
  id: string;
  deal: TDeal;
  deals: Deal[];
};

export default defineLayout<DealState>(async (req, ctx) => {
  const { id } = ctx.params;
  const [deal, deals] = await Promise.all([
    $client.deals.get(id) as TDeal,
    $client.deals.find() as Deal[],
  ]);

  ctx.state.data = { id, deal, deals };

  return (
    <>
      <DealHeader deal={deal} />

      <nav className="sticky top-0 bg-background z-10">
        <NavLink href={`/deals/${id}`}>
          Overview
        </NavLink>
        <NavLink href={`/deals/${id}/notes`}>
          Notes
        </NavLink>
        <Separator />
      </nav>

      <div className="h-full overflow-y-auto">
        <ctx.Component />
      </div>
    </>
  );
});
