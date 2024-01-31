import { defineRoute } from "$fresh/server.ts";
import type { TableProps } from "netzo/components/blocks/table/table.tsx";
import { ALIASES, type Invoice } from "@/resources/invoices.ts";
import { Table } from "@/islands/invoices/Table.tsx";
import { netzo } from "@/netzo.ts";

export const getTableOptions = (
  data: Invoice[],
): TableProps<Invoice, unknown>["options"] => {
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
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await netzo.service("invoices").find<Invoice>(); // GET /api/invoices

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table data={data} options={options} />
    </div>
  );
});
