import { describe, it } from "https://deno.land/std@0.137.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.137.0/testing/asserts.ts";
import OAClientError from "./OAClientError.ts";

describe("OAClientError", () => {
  it("creates instances of OAClientError", () => {
    const error = new OAClientError(0, { test: "xxx" });
    assertEquals(error instanceof OAClientError, true);
    assertEquals(new Error() instanceof OAClientError, false);
  });
  it("sets .code", () => {
    const error = new OAClientError(0, { test: "xxx" });
    assertEquals(error.code, 0);
  });
  it("formats a message", () => {
    const error = new OAClientError(0, { test: "xxx" });
    assertEquals(error.message, "[oa-client:0] Test is equal to xxx");
  });
});
