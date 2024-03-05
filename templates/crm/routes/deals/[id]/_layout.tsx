import { Partial } from "$fresh/runtime.ts";
import { defineLayout } from "$fresh/server.ts";
import { NavLink } from "netzo/components/nav-link.tsx";
import { Separator } from "netzo/components/separator.tsx";
import type { NetzoState } from "netzo/mod.ts";
import type { Account } from "../../../data/accounts.ts";
import type { Contact } from "../../../data/contacts.ts";
import type { Deal } from "../../../data/deals.ts";
import type { User } from "../../../data/users.ts";
import { DealHeader } from "../../../islands/deal.tsx";
import { $client } from "../../../netzo.config.ts";

export type DealState = NetzoState & {
  id: string;
  deal: TDeal;
  deals: Deal[];
};

export default defineLayout<DealState>(async (req, ctx) => {
  const { id } = ctx.params;
  const [deal, accounts, contacts, users] = await Promise.all([
    $client.deals.get(id) as Deal,
    $client.accounts.find() as unknown as Account[],
    $client.contacts.find() as unknown as Contact[],
    $client.users.find() as unknown as User[],
  ]);

  ctx.state.data = { id, deal, accounts, contacts, users };

  return (
    <>
      <DealHeader deal={deal} />

      <nav f-client-nav className="sticky top-0 bg-background">
        <NavLink href={`/deals/${id}`}>
          Overview
        </NavLink>
        <NavLink href={`/deals/${id}/events`}>
          Events
        </NavLink>
        <Separator />
      </nav>

      <Partial name="main-content">
        <ctx.Component />
      </Partial>
    </>
  );
});
