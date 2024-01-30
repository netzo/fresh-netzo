import { defineRoute } from "$fresh/server.ts";
import type { TableProps } from "netzo/components/blocks/table/table.tsx";
import { type Account, ALIASES } from "@/resources/accounts.ts";
import { Table } from "@/islands/accounts/Table.tsx";
import { netzo } from "@/netzo.ts";

export const getTableOptions = (
  data: Account[],
): TableProps<Account, unknown>["options"] => {
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
    ],
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await netzo.service("accounts").find<Account>(); // GET /api/accounts

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table data={data} options={options} />
    </div>
  );
});
