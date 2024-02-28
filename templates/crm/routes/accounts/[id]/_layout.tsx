import { defineLayout } from "$fresh/server.ts";
import { NavLink } from "netzo/components/nav-link.tsx";
import { Separator } from "netzo/components/separator.tsx";
import type { NetzoState } from "netzo/mod.ts";
import type { Account as TAccount } from "../../../data/accounts.ts";
import type { Deal } from "../../../data/deals.ts";
import { AccountHeader } from "../../../islands/account.tsx";
import { $client } from "../../../netzo.config.ts";

export type AccountState = NetzoState & {
  id: string;
  account: TAccount;
  deals: Deal[];
};

export default defineLayout<AccountState>(async (req, ctx) => {
  const { id } = ctx.params;
  const [account, deals] = await Promise.all([
    $client.accounts.get(id) as TAccount,
    $client.deals.find() as Deal[],
  ]);

  ctx.state.data = { id, account, deals };

  return (
    <>
      <AccountHeader account={account} />

      <nav className="sticky top-0 bg-background z-10">
        <NavLink href={`/accounts/${id}`}>
          Overview
        </NavLink>
        <NavLink href={`/accounts/${id}/events`}>
          Events
        </NavLink>
        <Separator />
      </nav>

      <div className="h-full overflow-y-auto">
        <ctx.Component />
      </div>
    </>
  );
});
