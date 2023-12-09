import { defineRoute } from "$fresh/src/server/mod.ts";
import { getOptions } from "@/components/tables/invoices/data/options.tsx";
import { Table } from "@/islands/Invoices.tsx";
import { Invoice } from "@/components/tables/invoices/data/schema.ts";
import { db } from "@/utils/db.ts";

export default defineRoute(async (req, ctx) => {
  const data = await db.find<Invoice>("invoices");

  const options = getOptions(data);

  if (!data) return ctx.renderNotFound();
  return <Table data={data} options={options} />;
});