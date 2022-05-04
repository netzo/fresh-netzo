import { describe, it } from "https://deno.land/std@0.137.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.137.0/testing/asserts.ts";
import getCallPath from "./get-call-path.ts";

describe("getCallPath", () => {
  it("formats the path with the url params", () => {
    const path = "/hello/{world}/it-is/{sunny}";
    const pathParams = { world: "moon", sunny: "cloudy" };

    assertEquals(getCallPath(path, pathParams), "/hello/moon/it-is/cloudy");
  });
});
