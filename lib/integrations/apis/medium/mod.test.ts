import { assertEquals, assertExists } from "../../../deps/std/assert/mod.ts";
import { medium } from "./mod.ts";

Deno.test("[apis] medium", async (t) => {
  const api = medium({
    accessToken: Deno.env.get("MEDIUM_ACCESS_TOKEN")!,
  });

  await t.step("find publications", async () => {
    const result = await api.users["USER_ID"].publications.get();
    assertExists(result.data);
    assertEquals(Array.isArray(result.data), true);
  });

  await t.step("get user", async () => {
    const result = await api.me.get();
    assertExists(result.data);
    assertEquals(typeof result.data, "object");
  });
});
