import { defineRoute } from "$fresh/server.ts";
import type { KanbanProps } from "netzo/components/blocks/kanban/kanban.tsx";
import { type Deal, I18N } from "@/data/deals.ts";
import { Kanban } from "@/islands/deals/Kanban.tsx";
import { resource } from "@/netzo.ts";

export const getKanbanOptions = (
  data: Deal[],
): KanbanProps<Deal>["options"] => {
  return {
    resource: "deals",
    fieldIds: {
      id: "id",
      group: "status",
      name: "title",
      description: "description",
      image: "image",
    },
    groups: [
      {
        id: "backlog",
        title: "Backlog",
        icon: { className: "i-mdi-circle-outline bg-lightgray-500" },
        badge: { className: "bg-lightgray-500" },
      },
      {
        id: "todo",
        title: "Todo",
        icon: { className: "i-mdi-circle-slice-2 bg-orange-500" },
        badge: { className: "bg-orange-500" },
      },
      {
        id: "in-progress",
        title: "In Progress",
        icon: { className: "i-mdi-circle-slice-6 bg-yellow-500" },
        badge: { className: "bg-yellow-500" },
      },
      {
        id: "done",
        title: "Done",
        icon: { className: "i-mdi-check-circle bg-green-500" },
        badge: { className: "bg-green-500" },
      },
      {
        id: "cancelled",
        title: "Cancelled",
        icon: { className: "i-mdi-close-circle bg-gray-500" },
        badge: { className: "bg-gray-500" },
      },
    ],
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await resource("deals").find<Deal>();

  const options = getKanbanOptions(data);

  return (
    <div className="h-full p-4">
      <Kanban data={data} options={options} />
    </div>
  );
});
