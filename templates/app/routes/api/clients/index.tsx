// import { zValidator } from "@hono/zod-validator";
import { ulid } from "netzo/db/mod.ts";
import { createDatabase } from "netzo/db/mod.ts";
import { filterObjectsByKeyValues } from "netzo/utils/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { Client } from "@/components/tables/clients/data/schema.ts";
import { getQueryParams } from "@/utils.tsx";

const kv = await Deno.openKv();
const db = createDatabase(kv);

export const handler: Handlers<Client | null> = {
  async GET(req, _ctx) {
    const url = new URL(req.url);
    const queryObject = getQueryParams(url);
    const result = await db.find<Client>("clients");
    const data = filterObjectsByKeyValues(result, queryObject);
    return new Response(JSON.stringify(data));
  },
  async POST(req, _ctx) {
    const client = (await req.json()) as Client;
    const completedData = {
      id: ulid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...client,
    };
    const result = await db.create<Client>("clients", completedData);
    return new Response(JSON.stringify(result));
  },
};
