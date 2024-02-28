import { assertExists } from "../../deps/std/assert/mod.ts";
import "../../deps/std/dotenv/load.ts";
import { redis } from "./redis.ts";

Deno.test("[dbs] redis", { ignore: !Deno.env.get("REDIS_URL")! }, async (t) => {
  const db = redis({ url: Deno.env.get("REDIS_URL")! });

  await t.step("declarations", () => {
    assertExists(redis);
    assertExists(db);
  });
});
