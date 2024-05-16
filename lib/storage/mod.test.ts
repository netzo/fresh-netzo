import { assertExists } from "../deps/std/assert/mod.ts";
import { storage } from "./mod.ts";

const db = storage();

Deno.test("[storage] storage", { ignore: false }, async (t) => {
  await t.step("declarations", () => {
    assertExists(storage);
    assertExists(db);
  });
});
