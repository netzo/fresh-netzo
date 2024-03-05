import { Partial } from "$fresh/runtime.ts";
import { defineLayout } from "$fresh/server.ts";
import { NavLink } from "netzo/components/nav-link.tsx";
import { Separator } from "netzo/components/separator.tsx";
import type { NetzoState } from "netzo/mod.ts";
import type { Account } from "../../../data/accounts.ts";
import type { Deal } from "../../../data/deals.ts";
import { AccountHeader } from "../../../islands/account.tsx";
import { $api } from "../../api.ts";

export type AccountState = NetzoState & {
  id: string;
  account: Account;
  deals: Deal[];
};

export default defineLayout<AccountState>(async (req, ctx) => {
  const { id } = ctx.params;
  const [account, deals] = await Promise.all([
    $api.accounts.get(id) as Account,
    $api.deals.find() as Deal[],
  ]);

  ctx.state.data = { id, account, deals };

  return (
    <>
      <AccountHeader account={account} />

      <nav f-client-nav className="sticky top-0 bg-background">
        <NavLink href={`/accounts/${id}`}>
          Overview
        </NavLink>
        <Separator />
      </nav>

      <Partial name="main-content">
        <ctx.Component />
      </Partial>
    </>
  );
});
