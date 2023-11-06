import { defineRoute } from "$fresh/server.ts";
import { getOptions } from "@/components/tables/clients/data/options.tsx";
import { Table } from "@/islands/Clients.tsx";
import { Client } from "@/components/tables/clients/data/schema.ts";
import { db } from "@/utils/db.ts";

export default defineRoute(async (req, ctx) => {
  const data = await db.find<Client>("clients");

  if (!data) return ctx.renderNotFound();

  const options = getOptions(data);

  return <Table data={data} options={options} />;
});
