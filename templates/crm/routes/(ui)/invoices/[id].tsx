import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Invoice } from "@/data/invoices.ts";
import { FormInvoice } from "@/islands/invoices/Form.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new" ? {} : await app.db.get<Invoice>("invoices", id);

  if (!data) return ctx.renderNotFound();

  const url = id === "new"
    ? `${ctx.url.origin}/api/invoices`
    : `${ctx.url.origin}/api/invoices/${id}`;

  return (
    <div className="my-4 overflow-auto">
      <Separator></Separator>
      <div className="p-10 max-w-500px">
        <FormInvoice
          data={data}
          method={id === "new" ? "POST" : "PATCH"}
          url={url}
        />
      </div>
    </div>
  );
});
