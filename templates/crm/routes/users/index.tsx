import { defineRoute } from "$fresh/server.ts";
import type { TableProps } from "netzo/components/blocks/table/use-table.ts";
import { type User } from "../../data/users.ts";
import { Table } from "../../islands/users/Table.tsx";
import { $client } from "../../netzo.config.ts";

export const getTableOptions = (
  data: User[],
): TableProps<User, unknown>["options"] => {
  return {
    resource: "users",
    fieldIds: {
      id: "id",
      name: "name",
      image: "accountId",
    },
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [],
    layouts: ["grid"],
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await $client.users.find() as User[];

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table data={data} options={options} />
    </div>
  );
});
