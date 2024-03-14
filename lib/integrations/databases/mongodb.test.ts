import { assertExists } from "../../deps/std/assert/mod.ts";
import { mongodb } from "./mongodb.ts";

Deno.test("[dbs] mongodb", {
  ignore: !Deno.env.get("MONGODB_URL")! || !Deno.env.get("MONGODB_DATABASE")!,
}, async (t) => {
  const db = mongodb({
    url: Deno.env.get("MONGODB_URL")!,
    database: Deno.env.get("MONGODB_DATABASE")!,
  });

  await t.step("declarations", () => {
    assertExists(mongodb);
    assertExists(db);
  });
});
