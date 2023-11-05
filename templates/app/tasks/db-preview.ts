import { createDatabase } from "netzo/db/mod.ts";

const kv = await Deno.openKv();
const db = createDatabase(kv);

export const dbPreview = async () => {

  let clients, contacts, invoices;

  const findPromises = [
    db.find("clients"),
    db.find("contacts"),
    db.find("invoices")
  ];

  try {
    [clients, contacts, invoices] = await Promise.all(findPromises);
    console.log("clients:");
    console.table(clients);
    console.log("contacts:");
    console.table(contacts);
    console.log("invoices:");
    console.table(invoices);
  } catch (error) {
    console.error("An error occurred:", error);
    return
  }
};

if (import.meta.main) dbPreview();
