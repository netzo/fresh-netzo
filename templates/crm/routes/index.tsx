import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../data/accounts.ts";
import { Dashboard } from "../islands/dashboard.tsx";
import { $client } from "../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const accountId = ctx.url.searchParams.get("accountId");
  const [metrics, accounts] = await Promise.all([
    $client.metrics.find({ accountId }),
    $client.accounts.find() as Account[],
  ]);

  const account = accounts.find((account) => account.id === accountId) ??
    { id: "sales-team" };

  return (
    <div className="h-screen overflow-y-auto p-4">
      <Dashboard data={[metrics, accounts, account]} />
    </div>
  );
});
