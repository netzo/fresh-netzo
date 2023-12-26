import { clients } from "@/data/clients.ts";
import { contacts } from "@/data/contacts.ts";
import { invoices } from "@/data/invoices.ts";
import { app } from "@/netzo.ts";

//Seed a local KV from fake data files.

const dbSeed = async () => {
  const createPromises = [
    Promise.all(clients.map((d) => app.kv.set(["clients", d.id], d))),
    Promise.all(contacts.map((d) => app.kv.set(["contacts", d.id], d))),
    Promise.all(invoices.map((d) => app.kv.set(["invoices", d.id], d))),
  ];

  try {
    await Promise.all(createPromises);
    console.log("Data uploaded to DB.");
  } catch (error) {
    console.error("Error seeding Database:", error);
  }
};

if (import.meta.main) dbSeed();
