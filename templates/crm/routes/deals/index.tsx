import { defineRoute } from "$fresh/server.ts";
import type { KanbanProps } from "netzo/components/blocks/kanban/kanban.tsx";
import { ALIASES, type Deal } from "@/resources/deals.ts";
import { Kanban } from "@/islands/deals/Kanban.tsx";
import { netzo } from "@/netzo.ts";

export const getKanbanOptions = (
  data: Deal[],
): KanbanProps<Deal>["options"] => {
  return {
    resource: "deals",
    fieldIds: {
      id: "id",
      column: "status",
      name: "title",
      description: "description",
    },
    columns: [
      { id: "backlog" as const, title: "Backlog" },
      { id: "todo" as const, title: "Todo" },
      { id: "in-progress" as const, title: "In Progress" },
      { id: "done" as const, title: "Done" },
      { id: "cancelled", title: "Cancelled" },
    ],
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await netzo.service("deals").find<Deal>(); // GET /api/deals

  const options = getKanbanOptions(data);

  return (
    <div className="h-full p-4">
      <Kanban data={data} options={options} />
    </div>
  );
});
