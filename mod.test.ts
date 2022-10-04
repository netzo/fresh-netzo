import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from "./mod.ts";

const { API_KEY } = config();

Deno.test("netzo", () => {
  const netzo = Netzo({ apiKey: API_KEY });

  assertExists(netzo);
  assertExists(netzo.api);
  assertExists(netzo.baseURL);
  assertExists(netzo.getApiKey);
  assertExists(netzo.service);
  assertExists(netzo.http);
});
