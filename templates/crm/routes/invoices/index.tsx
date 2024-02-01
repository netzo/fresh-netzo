import { defineRoute } from "$fresh/server.ts";
import type { ViewProps } from "netzo/composables/use-view.ts";
import { View } from "netzo/components/blocks/view/view.tsx";
import { ALIASES, type Invoice } from "@/resources/invoices.ts";
import { Table } from "@/islands/invoices/Table.tsx";
import { netzo } from "@/netzo.ts";

export const getTableOptions = (
  data: Invoice[],
): ViewProps<Invoice, unknown>["options"] => {
  return {
    servicePath: "invoices",
    search: {
      column: "invoiceNumber",
      placeholder: "Search by invoice number...",
    },
    filters: [
      {
        column: "status",
        title: ALIASES.status,
        options: [...new Set(data.map((item) => item.status))].map((
          value,
        ) => (value ? { label: value, value } : { label: "*no data", value })),
      },
    ],
    views: ["table"],
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await netzo.service("invoices").find<Invoice>();

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table data={data} options={options} />
    </div>
  );
});
