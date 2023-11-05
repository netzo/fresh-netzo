import { Handlers } from "$fresh/server.ts";
import { Invoice } from "@/components/tables/invoices/data/schema.ts";
import { Client } from "@/components/tables/clients/data/schema.ts";
import { db } from "@/db.ts";

export const handler: Handlers<Invoice | null> = {
  async GET(req, ctx) {
    const invoice = await db.get<Invoice>("invoices", ctx.params.id);
    if (!invoice) {
      return new Response("Not found", { "status": 404 });
    }
    const client = invoice.clientId
      ? await db.get<Client>("clients", invoice.clientId)
      : undefined;
    return new Response(JSON.stringify({ ...invoice, client: client }));
  },

  async PUT(req, ctx) {
    const invoice = (await req.json()) as Invoice;
    const completedData = {
      ...invoice,
      updatedAt: new Date().toISOString(),
      id: invoice.id || ctx.params.id, //just in case
    };
    const result = await db.update<Invoice>(
      "invoices",
      ctx.params.id,
      completedData,
    );
    return new Response(JSON.stringify(result));
  },
  async PATCH(req, ctx) {
    const invoice = (await req.json()) as Invoice;
    const completedData = {
      ...invoice,
      updatedAt: new Date().toISOString(),
    };
    const result = await db.patch<Invoice>(
      "invoices",
      ctx.params.id,
      completedData,
    );
    return new Response(JSON.stringify(result));
  },
  async DELETE(_req, ctx) {
    const result = await db.remove<Invoice>("invoices", ctx.params.id);
    return new Response(JSON.stringify(result));
  },
};
