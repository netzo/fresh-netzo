const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

const SERVICES = ["accounts"]; // , "deals", "contacts", "invoices"];

export const dbSeed = async () => {
  try {
    await Promise.all(SERVICES.map(async (service) => {
      const mod = await import(`@/data/${service}.entries.json`, {
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
