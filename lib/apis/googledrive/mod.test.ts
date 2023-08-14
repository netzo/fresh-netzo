import { assertEquals, assertExists } from "../deps.ts";
import { googledrive } from "./mod.ts";

Deno.test("googledrive", async (t) => {
  const { options } = await import("./googledrive.options.ts");
  const { api } = googledrive(options);

  await t.step("api", async () => {
    const result = await api.drives.get();
    assertExists(result.kind);
  });

  await t.step("find files", async () => {
    const result = await api.files.get();
    assertExists(result.files);
    assertEquals(Array.isArray(result.files), true);
  });

  await t.step("get file", async () => {
    const data = await api.files["FILE_ID"].get();
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("copy file", async () => {
    const data = await api.files["FILE_ID"].copy.post({
      description: "Test copy",
    });
    assertExists(data);
    assertEquals(typeof data, "object");
  });
});
