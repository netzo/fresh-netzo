import { assertExists } from "../deps/std/assert/mod.ts";
import { datastore } from "./mod.ts";

const db = datastore({ kv: await Deno.openKv(":memory:") });

Deno.test("[datastore] datastore", { ignore: false }, async (t) => {
  await t.step("declarations", () => {
    assertExists(datastore);
    assertExists(db);
  });
});
