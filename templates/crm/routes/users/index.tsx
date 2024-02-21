import { defineRoute } from "$fresh/server.ts";
import { type User } from "../../data/users.ts";
import { Table } from "../../islands/users/Table.tsx";
import { $client } from "../../netzo.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const data = await $client.users.find() as User[];

  return (
    <div className="h-full p-4">
      <Table data={data} />
    </div>
  );
});
