import { z } from "zod";
import { generateMock } from "npm:@anatine/zod-mock@3.13.3";
import { ulid } from "netzo/core/api/utils.ts";

const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

const SERVICES = {
  accounts: (await import("@/services/accounts.ts")).accountSchema,
  contacts: (await import("@/services/contacts.ts")).contactSchema,
  deals: (await import("@/services/deals.ts")).dealSchema,
  interactions: (await import("@/services/interactions.ts")).interactionSchema,
  invoices: (await import("@/services/invoices.ts")).invoiceSchema,
  transactions: (await import("@/services/transactions.ts")).transactionSchema,
};

const [length = 25] = Deno.args;

const generate = (schema: z.ZodSchema, idField = "id") => {
  return generateMock(schema, {
    keyName: idField,
    recordKeysLength: 2,
    mapEntriesLength: 2,
    stringMap: {
      [idField]: () => ulid(),
    },
  });
};

// seed a local KV from fake data files.
export const dbMock = async () => {
  try {
    await Promise.all(
      Object.entries(SERVICES).map(async ([service, schema]) => {
        // generate mock data
        const entries = Array.from(Array(length)).map(() => {
          const value = generate(schema);
          return { key: [service, value.id], value };
        });

        // write to file
        const fileURL = import.meta.resolve(`@/data/${service}.entries.json`);
        await Deno.writeTextFile(
          fileURL.replace("file://", ""),
          JSON.stringify(entries, null, 2),
        );

        // write to KV
        return Promise.all(entries.map(({ key, value }) => kv.set(key, value)));
      }),
    );
    console.log("Data uploaded to DB.");
  } catch (error) {
    console.error("Error seeding Database:", error);
  } finally {
    Deno.exit(0);
  }
};

if (import.meta.main) dbMock();
