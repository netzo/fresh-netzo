const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

const SERVICES = [
  "accounts",
  "contacts",
  "deals",
  "interactions",
  "invoices",
  "transactions",
];

const [length = 25] = Deno.args;

// seed a local KV from fake data files.
export const dbMock = async () => {
  try {
    await Promise.all(
      SERVICES.map(async (service) => {
        const { mock } = await import(`@/services/${service}.ts`);
        // generate mock data
        const entries = Array.from(Array(length)).map(() => {
          const value = mock();
          return { key: [service, value.id], value };
        });

        // write to file
        const fileURL = import.meta.resolve(`@/data/${service}.entries.json`);
        await Deno.writeTextFile(
          fileURL.replace("file://", ""),
          JSON.stringify(entries, null, 2),
        );

        // write to KV
        return Promise.all(entries.map(({ key, value }) => kv.set(key, value)));
      }),
    );
    console.log("Mock data written to files");
  } catch (error) {
    console.error("Error mocking data:", error);
  } finally {
    Deno.exit(0);
  }
};

if (import.meta.main) dbMock();
