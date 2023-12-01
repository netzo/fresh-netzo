import { createDatabase, ulid } from "netzo/database/mod.ts";
import { filterObjectsByKeyValues } from "netzo/utils/mod.ts";
import { Handlers } from "$fresh/src/server/mod.ts";
import { Invoice } from "@/components/tables/invoices/data/schema.ts";
import { Client } from "@/components/tables/clients/data/schema.ts";
import { getQueryParams } from "@/utils.tsx";
import { db } from "@/utils/db.ts";

export const handler: Handlers<Invoice | null> = {
  async GET(req, _ctx) {
    const url = new URL(req.url);
    const queryObject = getQueryParams(url);

    const [invoices, clients] = await Promise.all([
      db.find<Invoice>("invoices"),
      db.find<Client>("clients"),
    ]);
    const data = filterObjectsByKeyValues(invoices, queryObject);
    const joinedData = JSON.stringify(data.map((data) => ({
      ...data,
      client: clients.find(({ id }) => id === data.clientId),
    })));
    return new Response(joinedData);
  },

  async POST(req, _ctx) {
    const invoice = (await req.json()) as Invoice;
    const completedData = {
      id: ulid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...invoice,
    };

    const result = await db.create<Invoice>(
      "invoices",
      completedData,
      "id",
    );
    return new Response(JSON.stringify(result));
  },
};
