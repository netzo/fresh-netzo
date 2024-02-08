import { fetchHtml } from "$fresh/tests/test_utils.ts";
import { withFresh } from "./test_utils.ts";
import { assertEquals } from "std/assert/mod.ts";

Deno.test("index test", async () => {
  await withFresh("./netzo.ts", ["dev"], async (address) => {
    const doc = await fetchHtml(address);
    assertEquals(
      doc.querySelector("div")?.textContent,
      "Welcome to Netzo",
    );
  });
});
