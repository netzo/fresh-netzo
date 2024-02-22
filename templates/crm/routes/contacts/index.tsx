import { defineRoute } from "$fresh/server.ts";
import { type Contact } from "../../data/contacts.ts";
import { Table } from "../../islands/contacts.tsx";
import { $client } from "../../netzo.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const data = await $client.contacts.find() as Contact[];

  return (
    <div className="h-full p-4">
      <Table data={data} />
    </div>
  );
});
