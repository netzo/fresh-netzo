import { defineRoute } from "$fresh/server.ts";
import type { Contact } from "@/data/contacts.schema.ts";
import { getOptions } from "@/data/contacts.options.tsx";
import { Table } from "@/islands/contacts/Table.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const data = await app.db.find<Contact>("contacts");

  if (!data) return ctx.renderNotFound();

  const options = getOptions(data);

  return <Table data={data} options={options} />;
});
