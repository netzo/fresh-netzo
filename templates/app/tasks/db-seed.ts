import { createDatabase } from "netzo/db/mod.ts";
import { clients } from "@/data/clients.ts";
import { contacts } from "@/data/contacts.ts";
import { invoices } from "@/data/invoices.ts";

const kv = await Deno.openKv();
const db = createDatabase(kv);

//Seed a local KV from fake data files.

const dbSeed = async () => {
  const createPromises = [
    db.create("clients", clients),
    db.create("contacts", contacts),
    db.create("invoices", invoices)
  ]

  try {
    await Promise.all(createPromises);
    console.log("Data uploaded to DB.");
  } catch (error) {
    console.error("Error seeding Database:", error);
  }
}

if (import.meta.main) dbSeed();
