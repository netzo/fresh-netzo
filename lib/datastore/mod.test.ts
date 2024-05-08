import { assertExists } from "../deps/std/assert/mod.ts";
import { netzodb } from "./mod.ts";

const db = netzodb({ kv: await Deno.openKv(":memory:") });

Deno.test("[dbs] netzodb", { ignore: false }, async (t) => {
  await t.step("declarations", () => {
    assertExists(netzodb);
    assertExists(db);
  });
});
