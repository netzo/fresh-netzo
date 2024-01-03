import { defineRoute } from "$fresh/server.ts";
import type { Account } from "@/data/accounts.schema.ts";
import { getOptions } from "@/data/accounts.options.tsx";
import { Table } from "@/islands/accounts/Table.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const data = await app.db.find<Account>("accounts");

  if (!data) return ctx.renderNotFound();

  const options = getOptions(data);

  return (
    <div className="h-full p-4">
      <Table data={data} options={options} />
    </div>
  );
});
