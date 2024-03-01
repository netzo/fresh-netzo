import { defineRoute } from "$fresh/server.ts";
import { Dashboard } from "../components/dashboard.tsx";
import type { Account } from "../data/accounts.ts";
import type { Deal } from "../data/deals.ts";
import type { Metric } from "../data/metrics.ts";
import { $client } from "../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const accountId = ctx.url.searchParams.get("accountId");
  const [metrics, accounts, deals] = await Promise.all([
    $client.metrics.find({ accountId }) as unknown as Metric,
    $client.accounts.find() as Account[],
    $client.deals.find() as Deal[],
  ]);

  const account = accounts.find(({ id }) => id === accountId) as Account;

  return (
    <div className="h-screen overflow-y-auto p-4">
      <Dashboard data={[metrics, accounts, deals, account]} />
    </div>
  );
});
