import { defineRoute } from "$fresh/server.ts";
import { type Quote } from "../../data/quotes.ts";
import { Table } from "../../islands/quotes/Table.tsx";
import { $client } from "../../netzo.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const data = await $client.quotes.find() as Quote[];

  return (
    <div className="h-full p-4">
      <Table data={data} />
    </div>
  );
});
