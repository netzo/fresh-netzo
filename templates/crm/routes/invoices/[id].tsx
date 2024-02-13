import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Invoice } from "@/data/invoices.ts";
import { FormInvoice } from "@/islands/invoices/Form.tsx";
import { netzo } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new"
    ? {}
    : await netzo.resource("invoices").get<Invoice>(id);

  return (
    <div className="my-4 overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormInvoice
              data={data}
              method="POST"
              action={`/api/invoices`}
            />
          )
          : (
            <FormInvoice
              data={data}
              method="PATCH"
              action={`/api/invoices/${id}`}
            />
          )}
      </div>
    </div>
  );
});
