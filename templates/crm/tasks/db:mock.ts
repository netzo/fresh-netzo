export const FILEPATH = "../data/db.entries.json";

export const ID_FIELD = "id" as const;

export const RESOURCES = {
  accounts: 25,
  contacts: 25,
  deals: 25,
  quotes: 25,
  users: 5,
} as const;

export const dbMock = async () => {
  // deno-lint-ignore no-explicit-any
  const data = {} as Record<string, Omit<Deno.KvEntry<any>, "versionstamp">[]>;

  for (const [resource, length] of Object.entries(RESOURCES)) {
    const { mockAll, mock } = await import(`@/data/${resource}.ts`);
    // Generate mock data and prepare for KV store
    data[resource] = mockAll
      ? await mockAll() // (optional) generate all entries at once
      : Array.from({ length }, () => mock()).map((entry) => ({
        key: [resource, entry[ID_FIELD]],
        value: entry,
      }));
  }

  for (const [resource, _entries] of Object.entries(data)) {
    // [optional] modify entries e.g. to link with other resources
    if (resource === "contacts") {
      data[resource].forEach((entry, index) => {
        // associate random account from contact.accountId
        const account = data["accounts"][index];
        entry.value.accountId = account.value[ID_FIELD];
      });
    }
    if (resource === "deals") {
      data[resource].forEach((entry, _index) => {
        // associate random user from deal.userId
        const indexUsers = Math.floor(Math.random() * data["users"].length);
        entry.value.userId = data["users"][indexUsers].value[ID_FIELD];
        // associate random accounts from deal.accountIds
        entry.value.accountIds = entry.value.accountIds.map(() => {
          const index = Math.floor(Math.random() * data["accounts"].length);
          return data["accounts"][index].value[ID_FIELD];
        });
        // associate random contacts from deal.contactIds
        entry.value.contactIds = entry.value.contactIds.map(() => {
          const index = Math.floor(Math.random() * data["contacts"].length);
          return data["contacts"][index].value[ID_FIELD];
        });
      });
    }
  }

  const entries = Object.values(data).flat();

  const filepath = import.meta.resolve(FILEPATH).replace("file://", "");
  await Deno.writeTextFile(filepath, `${JSON.stringify(entries, null, 2)}\n`);

  console.log(`Mock data written to "data/db.entries.json".`);
  console.log(`Run "deno task db:load" to load entries into the database.`);

  Deno.exit(0);
};

if (import.meta.main) dbMock();
