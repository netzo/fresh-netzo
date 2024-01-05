import { defineRoute } from "$fresh/server.ts";
import type { DataTableProps } from "netzo/components/blocks/table/data-table.tsx";
import { ALIASES, type Contact } from "@/data/contacts.ts";
import { Table } from "@/islands/contacts/Table.tsx";
import { app } from "@/netzo.ts";

export const getTableOptions = (
  data: Contact[],
): DataTableProps<Contact, unknown>["options"] => {
  return {
    resource: "contacts",
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [],
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await app.db.find<Contact>("contacts");

  if (!data) return ctx.renderNotFound();

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table data={data} options={options} />
    </div>
  );
});
