import { defineRoute } from "$fresh/server.ts";
import type { KanbanProps } from "netzo/components/blocks/kanban/kanban.tsx";
import { ALIASES, type Deal } from "@/resources/deals.ts";
import { Kanban } from "@/islands/deals/Kanban.tsx";
import { netzo } from "@/netzo.ts";

export const getKanbanOptions = (
  data: Deal[],
): KanbanProps<Deal>["options"] => {
  return {
    servicePath: "deals",
    fieldIds: {
      id: "id",
      column: "status",
      name: "title",
      description: "description",
    },
    columns: [
      {
        id: "backlog",
        title: "Backlog",
        badge: { className: "bg-lightgray-500" },
      },
      {
        id: "todo",
        title: "Todo",
        badge: { className: "bg-yellow-500" },
      },
      {
        id: "in-progress",
        title: "In Progress",
        badge: { className: "bg-orange-500" },
      },
      {
        id: "done",
        title: "Done",
        badge: { className: "bg-green-500" },
      },
      {
        id: "cancelled",
        title: "Cancelled",
        badge: { className: "bg-gray-500" },
      },
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
