import { defineRoute } from "$fresh/server.ts";
import type { DataTableProps } from "netzo/components/blocks/table/data-table.tsx";
import { type Account, ALIASES } from "@/data/accounts.ts";
import { Table } from "@/islands/accounts/Table.tsx";
import { app } from "@/netzo.ts";

export const getTableOptions = (
  data: Account[],
): DataTableProps<Account, unknown>["options"] => {
  return {
    resource: "accounts",
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [
      {
        column: "status",
        title: ALIASES.status,
        options: [...new Set(data.map((item) => item.status))].map((
          value,
        ) => ({ label: value, value: value })),
      },
      {
        column: "type",
        title: ALIASES.type,
        options: [...new Set(data.map((item) => item.type))].sort().map((
          value,
        ) => (value ? { label: value, value } : { label: "*no data", value })),
      },
      {
        column: "address_city",
        title: ALIASES.address.city,
        options: [...new Set(data.map((item) => item.address?.city))].sort()
          .map(
            (
              value,
            ) => (value
              ? { label: value, value }
              : { label: "*no data", value }),
          ),
      },
    ],
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await app.db.find<Account>("accounts");

  if (!data) return ctx.renderNotFound();

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table data={data} options={options} />
    </div>
  );
});
