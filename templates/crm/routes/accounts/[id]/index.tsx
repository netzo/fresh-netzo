import { defineRoute } from "$fresh/server.ts";
import {
  AccountCardDeals,
  AccountCardForm,
  AccountMetrics,
} from "../../../islands/account.tsx";
import { AccountState } from "./_layout.tsx";

export default defineRoute<AccountState>((req, ctx) => {
  const { id, account, deals: allDeals } = ctx.state.data;
  const deals = allDeals.filter((deal) => deal.accountId === account?.id);

  return (
    <div className="h-full overflow-y-auto">
      <div class="flex flex-col gap-4 p-4">
        <AccountMetrics account={account} deals={deals} />
        <div className="grid lg:grid-cols-2 gap-4">
          <AccountCardForm account={account} />
          <AccountCardDeals account={account} deals={deals} />
        </div>
      </div>
    </div>
  );
});
