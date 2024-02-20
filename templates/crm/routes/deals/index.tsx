import { defineRoute } from "$fresh/server.ts";
import type { KanbanProps } from "netzo/components/blocks/kanban/kanban.tsx";
import { type Deal, I18N } from "../../data/deals.ts";
import { Kanban } from "../../islands/deals/Kanban.tsx";
import { $client } from "../../netzo.config.ts";

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
        id: "lead",
        title: I18N.status.lead,
        icon: { className: "i-mdi-circle-outline bg-lightgray-500" },
        badge: { className: "bg-lightgray-500" },
      },
      {
        id: "qualified",
        title: I18N.status.qualified,
        icon: { className: "i-mdi-circle-slice-2 bg-orange-500" },
        badge: { className: "bg-orange-500" },
      },
      {
        id: "negotiation",
        title: I18N.status.negotiation,
        icon: { className: "i-mdi-circle-slice-6 bg-yellow-500" },
        badge: { className: "bg-yellow-500" },
      },
      {
        id: "won",
        title: I18N.status.won,
        icon: { className: "i-mdi-check-circle bg-green-500" },
        badge: { className: "bg-green-500" },
      },
      {
        id: "lost",
        title: I18N.status.lost,
        icon: { className: "i-mdi-close-circle bg-red-500" },
        badge: { className: "bg-red-500" },
      },
    ],
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await $client.deals.find() as Deal[];

  const options = getKanbanOptions(data);

  return (
    <div className="h-full p-4">
      <Kanban data={data} options={options} />
    </div>
  );
});
