import "https://deno.land/std@0.205.0/dotenv/load.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.205.0/testing/asserts.ts";
import { googleappsheet } from "./mod.ts";

Deno.test("[apis] googleappsheet", async (t) => {
  const { api } = googleappsheet({
    appId: Deno.env.get("GOOGLEAPPSHEET_APP_ID")!,
    applicationAccessKey: Deno.env.get(
      "GOOGLEAPPSHEET_APPLICATION_ACCESS_KEY",
    )!,
  });

  await t.step("find records", async () => {
    const result = await api["TABLE_NAME"].Action.get({ Action: "Find" });
    assertExists(result.Rows);
    assertEquals(Array.isArray(result.Rows), true);
  });
});
