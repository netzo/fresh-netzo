import { defineRoute } from "$fresh/server.ts";
import type { Activity } from "@/components/tables/activities/data/schema.ts";
import { getOptions } from "@/components/tables/activities/data/options.tsx";
import { Table } from "@/islands/activities/Table.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const data = await app.db.find<Activity>("activities");

  if (!data) return ctx.renderNotFound();

  const options = getOptions(data);

  return <Table data={data} options={options} />;
});
