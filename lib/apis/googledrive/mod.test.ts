import "../../deps/std/dotenv/load.ts";
import { assertEquals, assertExists } from "../../deps/std/assert/mod.ts";
import { googledrive } from "./mod.ts";

Deno.test("[apis] googledrive", async (t) => {
  const api = googledrive({
    googleServiceAccountCredentials: Deno.env.get(
      "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS",
    )!,
  });

  await t.step("api", async () => {
    const result = await api.drives.get();
    assertExists(result.kind);
  });

  await t.step("find files", async () => {
    const result = await api.files.get();
    assertExists(result.files);
    assertEquals(Array.isArray(result.files), true);
  });

  //IDs required:

  // await t.step("get file", async () => {
  //   const resultData = await api.files["FILE_ID"].get();
  //   assertExists(resultData);
  //   assertEquals(typeof resultData, "object");
  // });

  //CUD operations:

  // await t.step("copy file", async () => {
  //   const resultData = await api.files["FILE_ID"].copy.post({
  //     description: "Test copy",
  //   });
  //   assertExists(resultData);
  //   assertEquals(typeof resultData, "object");
  // });
});
