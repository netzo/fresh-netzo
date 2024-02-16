import { defineRoute } from "$fresh/server.ts";
import { I18N, accountSchema, type Account } from "@/data/accounts.ts";
import { FormAccount } from "@/islands/accounts/Form.tsx";
import { Table } from "@/islands/accounts/Table.tsx";
import { resource } from "@/netzo.ts";
import type { TableProps } from "netzo/components/blocks/table/use-table.ts";

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
        column: "type",
        title: I18N.type,
        options: [...new Set(data.map((item) => item.type))].sort().map((
          value,
        ) => (value ? { label: value, value } : { label: "*no data", value })),
      },
    ],
    layouts: ["grid"],
    forms: {
      create: accountSchema,
      update: accountSchema,
    },
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await resource("accounts").find<Account>();

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table
        data={data}
        options={options}
        formCreate={FormAccount}
      />
    </div>
  );
});
