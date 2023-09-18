import "https://deno.land/std@0.198.0/dotenv/load.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { mailgun } from "./mod.ts";

Deno.test("mailgun", async (t) => {
  const { api } = mailgun({
    apiKey: Deno.env.get("MAILGUN_API_KEY")!,
  });

  await t.step("find mailing lists", async () => {
    const result = await api.v3.lists.pages.get();
    assertExists(result.items);
    assertEquals(Array.isArray(result.items), true);
  });
});
