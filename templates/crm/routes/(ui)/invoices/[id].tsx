import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Invoice } from "@/data/invoices.ts";
import { FormInvoice } from "@/islands/invoices/Form.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new" ? {} : await app.db.get<Invoice>(["invoices", id]);

  if (!data) return ctx.renderNotFound();

  return (
    <div className="my-4 overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormInvoice
              data={data}
              method="POST"
              url={`${ctx.url.origin}/api?$prefix=invoices`}
            />
          )
          : (
            <FormInvoice
              data={data}
              method="PATCH"
              url={`${ctx.url.origin}/api?$key=invoices,${id}`}
            />
          )}
      </div>
    </div>
  );
});
