const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

export const FILEPATH = "../data/data.entries.json";

const RESOURCES = {
  accounts: 25,
  contacts: 25,
  deals: 25,
  // quotes: 25,
  // products: 25,
  // transactions: 25,
  users: 10,
} as const;

export const dbMock = async () => {
  // deno-lint-ignore no-explicit-any
  const data = {} as Record<string, Omit<Deno.KvEntry<any>, "versionstamp">[]>;

  for (const [resource, length] of Object.entries(RESOURCES)) {
    const { mock } = await import(`@/data/${resource}.ts`);
    // Generate mock data and prepare for KV store
    data[resource] = Array.from({ length }, () => mock()).map((entry) => ({
      key: [resource, entry.id],
      value: entry,
    }));

    // [optional] modify entries e.g. to link with other resources
    if (resource === "contacts") {
      data[resource].forEach((entry, index) => {
        // const index = Math.floor(Math.random() * data["accounts"].length);
        const account = data["accounts"][index];
        entry.value.accountId = account.value.id;
      });
    }
  }

  const entries = Object.values(data).flat();

  const filepath = import.meta.resolve(FILEPATH).replace("file://", "");
  await Deno.writeTextFile(filepath, `${JSON.stringify(entries, null, 2)}\n`);

  console.log(`Mock data written to "data/data.entries.json".`);
  console.log(`Run "deno task db:load" to load entries into the database.`);

  Deno.exit(0);
};

if (import.meta.main) dbMock();
