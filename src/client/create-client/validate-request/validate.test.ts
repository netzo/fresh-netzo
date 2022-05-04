import { describe, it } from "https://deno.land/std@0.137.0/testing/bdd.ts";
import { assertThrows } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import validate from "./validate.ts";

describe("validate", () => {
  it("throws if data does not match schema, with an explanative message", () => {
    const schema = {
      type: "object",
      properties: {
        foo: { type: "number" },
        bar: { type: "string" },
      },
    };
    const data = {
      foo: "10",
      bar: 10,
    };

    assertThrows(
      () => validate(schema, data),
      Error,
      [
        "[oa-client:103] Data does not pass validation: data.foo should be number",
        "schema path: #/properties/foo/type",
        'params: {"type":"number"}',
        'data: {"foo":"10","bar":10}',
      ].join("\n"),
    );
  });
  it("does not throw if data matches schema", () => {
    const schema = { type: "number" };
    const data = 10;

    // FIXME:how do we implement .not.toThrow() in Deno?
    // assertThrows(() => validate(schema, data)).not.toThrow();
  });
});
