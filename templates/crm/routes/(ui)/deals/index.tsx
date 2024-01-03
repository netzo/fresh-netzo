import { defineRoute } from "$fresh/server.ts";
import type { Deal } from "@/data/deals.schema.ts";
import { getOptions } from "@/data/deals.options.tsx";
import { KanbanBoard } from "@/islands/deals/kanban/KanbanBoard.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const data = await app.db.find<Deal>("deals");

  if (!data) return ctx.renderNotFound();

  const options = getOptions(data);

  return (
    <div className="h-full p-4">
      <KanbanBoard data={data} options={options} />
    </div>
  );
});
