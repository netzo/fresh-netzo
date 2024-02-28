import { fetchHtml } from "$fresh/tests/test_utils.ts";
import { assertEquals } from "std/assert/mod.ts";
import { withFresh } from "./test.utils.ts";

Deno.test("index test", async () => {
  await withFresh("./dev.ts", [], async (address) => {
    const doc = await fetchHtml(address);
    assertEquals(
      doc.querySelector("body > nav > header > h2")?.textContent,
      "Netzo CRM",
    );
  });
});
