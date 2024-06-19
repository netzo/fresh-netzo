import { assert, assertEquals, assertStringIncludes } from "../../deps/std/assert.ts";
import { netzo, output } from "./utils.ts";

Deno.test("help command list", async () => {
  const proc = netzo([]);
  const [stdout, stderr, { code }] = await output(proc);
  assertStringIncludes(stderr, "SUBCOMMANDS:");
  assertStringIncludes(stderr, "deploy ");
  assertStringIncludes(stderr, "upgrade ");
  assertEquals(code, 1);
  assertEquals(stdout, "");
});

Deno.test("-V argument", async () => {
  const proc = netzo(["-V"]);
  const [stdout, stderr, { code }] = await output(proc);
  assertEquals(stderr, "");
  assertEquals(code, 0);
  assert(stdout.startsWith("netzo "));
});

Deno.test("--version argument", async () => {
  const proc = netzo(["--version"]);
  const [stdout, stderr, { code }] = await output(proc);
  assertEquals(stderr, "");
  assertEquals(code, 0);
  assert(stdout.startsWith("netzo "));
});

Deno.test("-h argument", async () => {
  const proc = netzo(["-h"]);
  const [stdout, stderr, { code }] = await output(proc);
  assertStringIncludes(stdout, "SUBCOMMANDS:");
  assertStringIncludes(stdout, "deploy ");
  assertStringIncludes(stdout, "upgrade ");
  assertEquals(code, 0);
  assertEquals(stderr, "");
});

Deno.test("deploy -h argument", async () => {
  const proc = netzo(["deploy", "-h"]);
  const [stdout, stderr, { code }] = await output(proc);
  assertStringIncludes(stdout, "USAGE:");
  assertStringIncludes(stdout, "netzo deploy");
  assertEquals(code, 0);
  assertEquals(stderr, "");
});

Deno.test("upgrade -h argument", async () => {
  const proc = netzo(["upgrade", "-h"]);
  const [stdout, stderr, { code }] = await output(proc);
  assertStringIncludes(stdout, "netzo upgrade");
  assertStringIncludes(stdout, "USAGE:");
  assertStringIncludes(stdout, "ARGS:");
  assertEquals(code, 0);
  assertEquals(stderr, "");
});
