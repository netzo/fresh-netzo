import "../../deps/std/dotenv/load.ts";
import { assertEquals, assertExists } from "../../deps/std/assert/mod.ts";
import { mailgun } from "./mod.ts";

Deno.test("[apis] mailgun", async (t) => {
  const api = mailgun({
    apiKey: Deno.env.get("MAILGUN_API_KEY")!,
  });

  await t.step("find mailing lists", async () => {
    const result = await api.v3.lists.pages.get();
    assertExists(result.items);
    assertEquals(Array.isArray(result.items), true);
  });
});
