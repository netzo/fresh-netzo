import { clients } from "@/data/clients.ts";
import { contacts } from "@/data/contacts.ts";
import { invoices } from "@/data/invoices.ts";
import { db, kv } from "@/utils/db.ts";

//Seed a local KV from fake data files.

const dbSeed = async () => {
  const createPromises = [
    kv.set(["portal", "config"], {
      title: "CRM",
      description: "A CRM built with Netzo",
      color: "#171717",
      backgroundColor: "#F5F5F5",
      logo: "https://netzo.io/logos/netzo-symbol-grayscale-light.svg",
      caption: {
        text: "Main Services Agreement",
        url:
          "https://netzo.io/legal/agreements-and-terms/main-services-agreement",
      },
    }),
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
