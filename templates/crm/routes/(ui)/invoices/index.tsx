import { defineRoute } from "$fresh/server.ts";
import type { Invoice } from "@/components/tables/invoices/data/schema.ts";
import { getOptions } from "@/components/tables/invoices/data/options.tsx";
import { Table } from "@/islands/invoices/Table.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const data = await app.db.find<Invoice>("invoices");

  if (!data) return ctx.renderNotFound();

  const options = getOptions(data);

  return <Table data={data} options={options} />;
});
