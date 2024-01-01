import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Invoice } from "@/components/tables/invoices/data/schema.ts";
import { FormInvoice } from "@/islands/invoices/Form.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = await app.db.get<Invoice>("invoices", id);

  if (!data) return ctx.renderNotFound();

  return (
    <div className="my-4 overflow-auto">
      <Separator></Separator>
      <div className="p-10 max-w-500px">
        <FormInvoice
          data={data}
          url={`${ctx.url.origin}/api/invoices/${id}`}
        />
      </div>
    </div>
  );
});
