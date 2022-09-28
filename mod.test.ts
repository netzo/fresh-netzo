import { config } from "https://deno.land/x/dotenv/mod.ts";
import { assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from "./mod.ts";

const { API_KEY } = config();

const netzo = Netzo({ apiKey: API_KEY })

Deno.test("main entry point", (): void => {
  assertExists(netzo);
  assertExists(netzo.api);
  assertExists(netzo.baseURL);
  assertExists(netzo.getApiKey);
  assertExists(netzo.services);
  assertExists(netzo.http);
});
