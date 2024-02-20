const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

const RESOURCES = [
  "accounts",
  "interactions",
  "contacts",
  "deals",
  "interactions",
  "invoices",
  "transactions",
  "users",
];

export const dbSeed = async () => {
  try {
    await Promise.all(RESOURCES.map(async (resource) => {
      const mod = await import(`@/data/${resource}.entries.json`, {
        with: { type: "json" },
      });
      return Promise.all(
        mod.default.map(({ key, value }) => kv.set(key, value)),
      );
    }));
    console.log("Data uploaded to DB.");
  } catch (error) {
    console.error("Error seeding Database:", error);
  } finally {
    Deno.exit(0);
  }
};

if (import.meta.main) dbSeed();
