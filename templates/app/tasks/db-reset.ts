// import { createDatabase } from "netzo/db/mod.ts";

// const kv = await Deno.openKv();
// const db = createDatabase(kv);

// const dbReset = async () => {
//   let clients, contacts, invoices;

//   const findPromises = [
//     db.find("clients"),
//     db.find("contacts"),
//     db.find("invoices")
//   ];

//   try {
//     [clients, contacts, invoices] = await Promise.all(findPromises);
//     console.log("All data retrieved successfully");
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return
//   }

//   const removeItems = (resource: string, id: string) => {
//     return db.remove(resource, id);
//   };

//   const removePromises = [];

//   for (const item of clients) {
//     removePromises.push(removeItems("clients", item.id));
//   }
//   for (const item of contacts) {
//     removePromises.push(removeItems("contacts", item.id));
//   }
//   for (const item of invoices) {
//     removePromises.push(removeItems("invoices", item.id));
//   }

//   try {
//     await Promise.all(removePromises);
//     console.log("All items removed successfully");
//   } catch (error) {
//     console.error("An error occurred during removal:", error);
//   }
// }

// if (import.meta.main) dbReset();

import { wipeKvStore } from "https://deno.land/x/kv_utils@1.1.1/mod.ts";

const result = await wipeKvStore();

if (!result.ok) {
  const keysWhichWereNotDeleted = result.failedKeys;
  console.log(keysWhichWereNotDeleted)
  // ....
}