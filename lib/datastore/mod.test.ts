import { assertExists } from "../deps/@std/assert.ts";
import { datastore } from "./mod.ts";

const ds = datastore({ kv: await Deno.openKv(":memory:") });

Deno.test("[datastore] datastore", { ignore: false }, async (t) => {
  await t.step("declarations", () => {
    assertExists(datastore);
    assertExists(ds);
  });
});
