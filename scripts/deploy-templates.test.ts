import "https://deno.land/std@0.198.0/dotenv/load.ts";
import { assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { deployTemplates } from "./deploy-templates.ts";

Deno.test("deployTemplates", () => {
  assertExists(deployTemplates);
});
