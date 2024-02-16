import { fetchHtml } from "$fresh/tests/test_utils.ts";
import { assertEquals } from "std/assert/mod.ts";
import { withFresh } from "./test.utils.ts";

Deno.test("index test", async () => {
  await withFresh("./netzo.ts", ["dev"], async (address) => {
    const doc = await fetchHtml(address);
    assertEquals(
      doc.querySelector(
        "body > div.flex.flex-col.w-full.h-full.overflow-x-hidden > header > div.flex.items-center.gap-2.\!my-auto > h1",
      )?.textContent,
      "Company CRM",
    );
  });
});
