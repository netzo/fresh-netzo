import { defineRoute } from "$fresh/server.ts";
import { EditForm } from "@/islands/Invoices.tsx";
import { Separator } from "netzo/components/ui/separator.tsx";
import { Invoice } from "@/components/tables/invoices/data/schema.ts";
import { db } from "@/utils/db.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;

  const data = await db.get<Invoice>("invoices", id);

  if (!data) return ctx.renderNotFound();

  return (
    <div className="my-4 overflow-auto">
      <Separator></Separator>
      <EditForm data={data} />
    </div>
  );
});
