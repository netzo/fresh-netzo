import { createDatabase, ulid } from "netzo/database/mod.ts";
import { filterObjectsByKeyValues } from "netzo/utils/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { Contact } from "@/components/tables/contacts/data/schema.ts";
import { Client } from "@/components/tables/clients/data/schema.ts";
import { getQueryParams } from "@/utils.tsx";
import { db } from "@/utils/db.ts";

export const handler: Handlers<Contact | null> = {
  async GET(req, _ctx) {
    const url = new URL(req.url);
    const queryObject = getQueryParams(url);

    const [contacts, clients] = await Promise.all([
      db.find<Contact>("contacts"),
      db.find<Client>("clients"),
    ]);
    const data = filterObjectsByKeyValues(contacts, queryObject);
    const joinedData = JSON.stringify(data.map((data) => ({
      ...data,
      client: clients.find(({ id }) => id === data.clientId),
    })));
    return new Response(joinedData);
  },

  async POST(req, _ctx) {
    const contact = (await req.json()) as Contact;
    const completedData = {
      id: ulid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...contact,
    };
    const result = await db.create<Contact>(
      "contacts",
      completedData,
      "id",
    );
    return new Response(JSON.stringify(result));
  },
};
