import { defineRoute } from "$fresh/server.ts";
import type { DataTableProps } from "netzo/components/blocks/table/data-table.tsx";
import type { Contact } from "@/components/data/contacts.ts";
import { Table } from "@/islands/contacts/Table.tsx";
import { app } from "@/netzo.ts";

export const ALIASES = {
  id: "ID",
  createdAt: "Created",
  updatedAt: "Updated",
  name: "Name",
  avatar: "Image",
  email: "Email",
  phone: "Phone",
  accountId: "Account",
  notifications: {
    new: "New products",
    promotions: "Promotions",
    marketing: "Marketing",
  },
};

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
