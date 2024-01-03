import { defineRoute } from "$fresh/server.ts";
import type { Deal } from "@/data/deals.schema.ts";
import { getOptions } from "@/data/deals.options.tsx";
// import { Table } from "@/islands/deals/Table.tsx";
import { KanbanBoard } from "@/islands/deals/kanban/KanbanBoard.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const data = await app.db.find<Deal>("deals");

  if (!data) return ctx.renderNotFound();

  const options = getOptions(data);

  // return <Table data={data} options={options} />;
  return <KanbanBoard data={data} options={options} />;
});
