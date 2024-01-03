import { defineRoute } from "$fresh/server.ts";
import type { Invoice } from "@/data/invoices.schema.ts";
import { getOptions } from "@/data/invoices.options.tsx";
import { Table } from "@/islands/invoices/Table.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const data = await app.db.find<Invoice>("invoices");

  if (!data) return ctx.renderNotFound();

  const options = getOptions(data);

  return (
    <div className="h-full p-4">
      <Table data={data} options={options} />
    </div>
  );
});
