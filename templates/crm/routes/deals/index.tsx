import { defineRoute } from "$fresh/server.ts";
import type { KanbanProps } from "netzo/components/blocks/kanban/kanban.tsx";
import { ALIASES, type Deal } from "@/services/deals.ts";
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
      image: "image",
    },
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await netzo.service("deals").find<Deal>();

  const options = getKanbanOptions(data);

  return (
    <div className="h-full p-4">
      <Kanban data={data} options={options} />
    </div>
  );
});
