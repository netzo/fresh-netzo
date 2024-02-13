const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

const RESOURCES = [
  "accounts",
  "contacts",
  "deals",
  "interactions",
  "invoices",
  "transactions",
];

const [length = 25] = Deno.args.map(Number);

async function writeToStoreAndFile(
  [resource, entries]: [string, any[]],
  _index: number,
) {
  // write to file
  const fileURL = import.meta.resolve(`@/data/${resource}.entries.json`);
  await Deno.writeTextFile(
    fileURL.replace("file://", ""),
    JSON.stringify(entries, null, 2),
  );
  // write to Deno KV
  await Promise.all(entries.map(({ key, value }) => kv.set(key, value)));
}

export const dbMock = async () => {
  try {
    // store data in memory to allow linking resources
    const data: { [key: string]: any[] } = {};

    for (const resource of RESOURCES) {
      const { mock } = await import(`@/data/${resource}.ts`);
      // generate mock data
      const entries = Array.from({ length }, () => mock());

      // assume mock() generates an id for each entry, adjust accordingly if needed
      data[resource] = entries.map((entry) => ({
        key: [resource, entry.id],
        value: entry,
      }));

      // [optional] modify entries e.g. to link with other resources
      if (resource === "contacts") {
        entries.forEach((entry, index) => {
          // const index = Math.floor(Math.random() * data["accounts"].length);
          const account = data["accounts"][index];
          entry.accountId = account.value.id;
        });
      }
    }

    // write data for each resource in parallel
    await Promise.all(Object.entries(data).map(writeToStoreAndFile));

    console.log("Mock data written to files and KV store");
  } catch (error) {
    console.error("Error mocking data:", error);
  } finally {
    Deno.exit(0);
  }
};

if (import.meta.main) dbMock();
