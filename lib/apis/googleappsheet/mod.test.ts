import "../../deps/std/dotenv/load.ts";
import { assertEquals, assertExists } from "../../deps/std/assert/mod.ts";
import { googleappsheet } from "./mod.ts";

Deno.test("[apis] googleappsheet", async (t) => {
  const api = googleappsheet({
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
