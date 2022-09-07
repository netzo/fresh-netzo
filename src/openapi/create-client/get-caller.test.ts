import { describe, it } from "https://deno.land/std@0.137.0/testing/bdd.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.137.0/testing/asserts.ts";
import getCaller from "./get-caller.ts";

describe("getCaller", () => {
  it("returns callers[routeSpec['x-type']] if it exists", () => {
    const callers = { foo: "FOO_CALLER" } as any;
    const routeSpec = { "x-type": "foo" };

    assertEquals(getCaller(callers, routeSpec, "get"), "FOO_CALLER");
  });
  it("returns callers[method] if it exists", () => {
    const callers = { get: "GET_CALLER", post: "POST_CALLER" } as any;
    const routeSpec = {};

    assertEquals(getCaller(callers, routeSpec, "post"), "POST_CALLER");
  });
  it("throws if no caller matches", () => {
    const callers = {};
    const routeSpec = { "x-type": "foo" };

    assertThrows(
      () => getCaller(callers, routeSpec, "get"),
      Error,
      "[oa-client:2]",
    );
  });
});
