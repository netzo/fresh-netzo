import "https://deno.land/std@0.204.0/dotenv/load.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.204.0/testing/asserts.ts";
import { ipgeolocation } from "./mod.ts";

Deno.test("[apis] ip geolocation", async (t) => {
  const { api } = ipgeolocation({
    apiKey: Deno.env.get("IPGEOLOCATION_API_KEY")!,
  });

  await t.step("get geolocation", async () => {
    const resultData = await api.ipgeo.get({ ip: "192.168.123.132" });
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });
});
