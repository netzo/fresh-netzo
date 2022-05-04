import { describe, it } from "https://deno.land/std@0.137.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.137.0/testing/asserts.ts";
import { createClient } from "./mod.ts";

const spec = {
  servers: [
    { url: "http://my.server.com" },
  ],
  paths: {
    "/users/{id}": {
      post: {
        "x-type": "simple-post",
      },
    },
  },
};
const callers = { "simple-post": () => Promise.resolve({}) };
const client = createClient(spec, callers, {
  origin: null,
  validationLevel: "error",
});

describe("createClient", () => {
  // FIXME: find a workaround for jest in Deno
  // beforeEach(() => {
  //   callers = {
  //     "simple-post": jest.fn(),
  //   };
  //   client = createClient(spec, callers, { validationLevel: "error" });
  // });
  // afterEach(() => {
  //   jest.resetAllMocks();
  // });
  it("should call the right caller with a compiled URL and the body", () => {
    client["/users/{id}"].post({
      pathParams: { id: "123456" },
      queryParams: { foo: "bar" },
      body: { some: "data" },
    });

    // FIXME: find a workaround for mock.calls in Deno
    // const url = "http://my.server.com/users/123456?foo=bar";
    // assertEquals(callers["simple-post"].mock.calls[0][0].toString(), url);
    // assertEquals(callers["simple-post"].mock.calls[0][1], { some: "data" });
  });
});
