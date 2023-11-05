import { clients } from "@/data/clients.ts";
import { contacts } from "@/data/contacts.ts";
import { invoices } from "@/data/invoices.ts";
import { db } from "@/db.ts";

//Seed a local KV from fake data files.

const dbSeed = async () => {
  const createPromises = [
    db.create("clients", clients, "id"),
    db.create("contacts", contacts, "id"),
    db.create("invoices", invoices, "id"),
  ];

  try {
    await Promise.all(createPromises);
    console.log("Data uploaded to DB.");
  } catch (error) {
    console.error("Error seeding Database:", error);
  }
};

if (import.meta.main) dbSeed();
