import { defineRoute } from "$fresh/server.ts";
import type { TableProps } from "netzo/components/blocks/table/use-table.ts";
import { type Product } from "../../data/products.ts";
import { Table } from "../../islands/products/Table.tsx";
import { $client } from "../../netzo.config.ts";

export const getTableOptions = (
  data: Product[],
): TableProps<Product, unknown>["options"] => {
  return {
    resource: "products",
    fieldIds: {
      id: "id",
      name: "name",
      image: "image",
    },
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [],
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await $client.products.find() as Product[];

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table data={data} options={options} />
    </div>
  );
});
