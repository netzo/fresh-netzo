import { defineRoute } from "$fresh/server.ts";
import { type Deal } from "../../data/deals.ts";
import { Kanban } from "../../islands/deals.tsx";
import { $client } from "../../netzo.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const data = await $client.deals.find() as Deal[];

  return (
    <div className="h-full p-4">
      <Kanban data={data} />
    </div>
  );
});
