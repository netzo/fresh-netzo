import { defineRoute } from "$fresh/server.ts";
import type { ViewProps } from "netzo/composables/use-view.ts";
import { View } from "netzo/components/blocks/view/view.tsx";
import { ALIASES, type Contact } from "@/resources/contacts.ts";
import { Table } from "@/islands/contacts/Table.tsx";
import { netzo } from "@/netzo.ts";

export const getTableOptions = (
  data: Contact[],
): ViewProps<Contact, unknown>["options"] => {
  return {
    servicePath: "contacts",
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [],
    views: ["table"],
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await netzo.service("contacts").find<Contact>();

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table data={data} options={options} />
    </div>
  );
});
