import { Deal } from "./deals.schema.ts";

export const aliases = {};

export const getOptions = (data: Deal[]) => {
  return {
    // NOTE: could eventually generate columns from data
    columns: [
      // { id: "backlog" as const, title: "Backlog" },
      { id: "todo" as const, title: "Todo" },
      { id: "in-progress" as const, title: "In Progress" },
      { id: "done" as const, title: "Done" },
      // { id: "cancelled", title: "Cancelled" },
    ],
    resource: "deals",
  };
};
