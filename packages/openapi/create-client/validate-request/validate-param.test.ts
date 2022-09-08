import { describe, it } from "https://deno.land/std@0.137.0/testing/bdd.ts";
import { assertThrows } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import validateParam from "./validate-param.ts";

describe("validateParam", () => {
  it("throws for absent required parameter", () => {
    const parameter = {
      in: "query",
      name: "userId",
      required: true,
      schema: { type: "integer" },
    };
    const value = undefined;

    assertThrows(
      () => validateParam(parameter, value),
      Error,
      "[oa-client:104]",
    );
  });
  it("throws for invalid required parameter", () => {
    const parameter = {
      in: "query",
      name: "userId",
      required: true,
      schema: { type: "integer" },
    };
    const value = 10.5;

    assertThrows(
      () => validateParam(parameter, value),
      Error,
      "[oa-client:103]",
    );
  });
  it("does not throw for valid required parameter", () => {
    const parameter = {
      in: "query",
      name: "userId",
      required: true,
      schema: { type: "integer" },
    };
    const value = 10;

    // FIXME:how do we implement .not.toThrow() in Deno?
    // assertThrows(() => validateParam(parameter, value)).not.toThrow();
  });
});
