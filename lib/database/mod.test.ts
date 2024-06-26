import { assertExists } from "../deps/@std/assert.ts";
import { database } from "./mod.ts";

const db = database({ url: "http://localhost:8080" });

Deno.test("[database] database", { ignore: false }, async (t) => {
  await t.step("declarations", () => {
    assertExists(database);
    assertExists(db);
  });
});
