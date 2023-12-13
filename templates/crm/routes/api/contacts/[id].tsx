import { Handlers } from "$fresh/server.ts";
import { Contact } from "@/components/tables/contacts/data/schema.ts";
import { Client } from "@/components/tables/clients/data/schema.ts";
import { db } from "@/utils/db.ts";

export const handler: Handlers<Contact | null> = {
  async GET(req, ctx) {
    const contact = await db.get<Contact>("contacts", ctx.params.id);
    if (!contact) {
      return new Response("Not found", { "status": 404 });
    }
    const client = contact.clientId
      ? await db.get<Client>("clients", contact.clientId)
      : undefined;

    return new Response(JSON.stringify({ ...contact, client: client }));
  },

  async PUT(req, ctx) {
    const contact = (await req.json()) as Contact;
    const completedData = {
      ...contact,
      updatedAt: new Date().toISOString(),
      id: contact.id || ctx.params.id, //just in case
    };
    const result = await db.update<Contact>(
      "contacts",
      ctx.params.id,
      completedData,
    );
    return new Response(JSON.stringify(result));
  },
  async PATCH(req, ctx) {
    const contact = (await req.json()) as Contact;
    const completedData = {
      ...contact,
      updatedAt: new Date().toISOString(),
    };
    const result = await db.patch<Contact>(
      "contacts",
      ctx.params.id,
      completedData,
    );
    return new Response(JSON.stringify(result));
  },
  async DELETE(_req, ctx) {
    const result = await db.remove<Contact>("contacts", ctx.params.id);
    return new Response(JSON.stringify(result));
  },
};
