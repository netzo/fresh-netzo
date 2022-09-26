import { config } from "https://deno.land/x/dotenv/mod.ts";
import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from "./mod.ts";
// TRYME: import { Netzo } from 'https://deno.land/x/netzo@v0.1.0/mod.ts'

const netzo = Netzo({ apiKey: config().API_KEY })

Deno.test("main entry point", (): void => {
  assertEquals<boolean>(!!netzo, true);
});
