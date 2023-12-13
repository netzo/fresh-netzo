import { Handlers } from "$fresh/server.ts";
import { Client } from "@/components/tables/clients/data/schema.ts";
import { db } from "@/utils/db.ts";

export const handler: Handlers<Client | null> = {
  async GET(req, ctx) {
    const result = await db.get<Client>("clients", ctx.params.id);
    if (!result) {
      return new Response("Not found", { "status": 404 });
    }
    return new Response(JSON.stringify(result));
  },

  async PUT(req, ctx) {
    const client = (await req.json()) as Client;
    const completedData = {
      ...client,
      updatedAt: new Date().toISOString(),
      id: client.id || ctx.params.id, //just in case
    };
    const result = await db.update<Client>(
      "clients",
      ctx.params.id,
      completedData,
    );
    return new Response(JSON.stringify(result));
  },
  async PATCH(req, ctx) {
    const client = (await req.json()) as Client;
    const completedData = {
      ...client,
      updatedAt: new Date().toISOString(),
    };
    const result = await db.patch<Client>(
      "clients",
      ctx.params.id,
      completedData,
    );
    return new Response(JSON.stringify(result));
  },
  async DELETE(_req, ctx) {
    const result = await db.remove<Client>("clients", ctx.params.id);
    return new Response(JSON.stringify(result));
  },
};
