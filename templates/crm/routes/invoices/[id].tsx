import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Invoice } from "@/resources/invoices.ts";
import { FormInvoice } from "@/islands/invoices/Form.tsx";
import { netzo } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new"
    ? {}
    : await netzo.service("invoices").get<Invoice>(id); // GET /api/invoices/:id

  return (
    <div className="my-4 overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormInvoice
              data={data}
              method="POST"
              action={`${ctx.url.origin}/db?$prefix=invoices`}
            />
          )
          : (
            <FormInvoice
              data={data}
              method="PATCH"
              action={`${ctx.url.origin}/db?$key=invoices,${id}`}
            />
          )}
      </div>
    </div>
  );
});
