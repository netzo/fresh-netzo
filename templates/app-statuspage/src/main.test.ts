import { createHandler, ServeHandlerInfo } from "$fresh/server.ts";
import { assertEquals } from "std/testing/asserts.ts";
import manifest from "./fresh.gen.ts";

import "std/dotenv/load.ts";

const CONN_INFO: ServeHandlerInfo = {
  remoteAddr: { hostname: "127.0.0.1", port: 53496, transport: "tcp" },
};

Deno.test("main", async (t) => {
  const handler = await createHandler(manifest);

  await t.step("GET /", async () => {
    const response = await handler(new Request("http://127.0.0.1/"), CONN_INFO);
    assertEquals(response.status, 200);
  });
});
