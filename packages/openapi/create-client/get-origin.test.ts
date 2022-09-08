import { describe, it } from "https://deno.land/std@0.137.0/testing/bdd.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.137.0/testing/asserts.ts";
import getOrigin from "./get-origin.ts";

describe("getOrigin", () => {
  it("returns origin if truthy", () => {
    const origin = "some-origin";
    const spec = {};

    assertEquals(getOrigin(origin, spec), "some-origin");
  });
  it("throws if origin is falsy and the spec precises no server URL", () => {
    const origin = null;
    const spec = {};

    assertThrows(() => getOrigin(origin, spec), Error, "[oa-client:3]");
  });
  it("returns spec.servers[0].url if it exists and origin is falsy", () => {
    const origin = null;
    const spec = { servers: [{ url: "some-url" }] };

    assertEquals(getOrigin(origin, spec), "some-url");
  });
});
