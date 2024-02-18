import { manifest } from "$fresh/src/dev/mod.ts";
import { fetchHtml } from "$fresh/tests/test_utils.ts";
import { assertEquals } from "std/assert/mod.ts";
import { withFresh } from "./test.utils.ts";

Deno.test("index test", async () => {
  await manifest(Deno.cwd());
  await withFresh("./dev.ts", [], async (address) => {
    const doc = await fetchHtml(address);
    assertEquals(
      doc.querySelector("div")?.textContent,
      "Welcome to Netzo",
    );
  });
});
