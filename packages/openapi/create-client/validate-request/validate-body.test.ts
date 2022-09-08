import { describe, it } from "https://deno.land/std@0.137.0/testing/bdd.ts";
import { assertThrows } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import validateBody from "./validate-body.ts";

describe("validateBody", () => {
  it("throws for a body that does not match the body schema", () => {
    const routeSpec = {
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "number",
            },
          },
        },
      },
    };
    const contentType = "application/json";
    const body = "hello";

    assertThrows(
      () => validateBody(routeSpec, contentType, body),
      Error,
      "[oa-client:103]",
    );
  });
  it("does not throw for a body that matches the body schema", () => {
    const routeSpec = {
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "number",
            },
          },
        },
      },
    };
    const contentType = "application/json";
    const body = 10;

    // FIXME:how do we implement .not.toThrow() in Deno?
    // assertThrows(() => validateBody(routeSpec, contentType, body)).not.toThrow();
  });
});
