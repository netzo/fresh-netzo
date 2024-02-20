import { defineRoute } from "$fresh/server.ts";
import type { TableProps } from "netzo/components/blocks/table/use-table.ts";
import { I18N, type Quote } from "../../data/quotes.ts";
import { Table } from "../../islands/quotes/Table.tsx";
import { $client } from "../../netzo.config.ts";

export const getTableOptions = (
  data: Quote[],
): TableProps<Quote, unknown>["options"] => {
  return {
    resource: "quotes",
    search: {
      column: "quoteNumber",
      placeholder: "Search by quote number...",
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
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await $client.quotes.find() as Quote[];

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table data={data} options={options} />
    </div>
  );
});
