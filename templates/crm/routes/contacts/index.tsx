import { defineRoute } from "$fresh/server.ts";
import type { TableProps } from "netzo/components/blocks/table/use-table.ts";
import { type Contact } from "../../data/contacts.ts";
import { Table } from "../../islands/contacts/Table.tsx";
import { api } from "../../netzo.config.ts";

export const getTableOptions = (
  data: Contact[],
): TableProps<Contact, unknown>["options"] => {
  return {
    resource: "contacts",
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
  const data = await api.contacts.get<Contact[]>();

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table data={data} options={options} />
    </div>
  );
});
