import { defineRoute } from "$fresh/server.ts";
import { I18N, type Invoice } from "@/data/invoices.ts";
import { Table } from "@/islands/invoices/Table.tsx";
import { resource } from "@/netzo.ts";
import type { TableProps } from "netzo/components/blocks/table/use-table.ts";

export const getTableOptions = (
  data: Invoice[],
): TableProps<Invoice, unknown>["options"] => {
  return {
    resource: "invoices",
    search: {
      column: "invoiceNumber",
      placeholder: "Search by invoice number...",
    },
    filters: [
      {
        column: "status",
        title: I18N.status,
        options: [...new Set(data.map((item) => item.status))].map((
          value,
        ) => (value ? { label: value, value } : { label: "*no data", value })),
      },
    ],
    layouts: ["grid"],
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await resource("invoices").find<Invoice>();

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table data={data} options={options} />
    </div>
  );
});
