await import("./app.netzo.ts"); // loads project configuration
import { Netzo } from "netzo/core/mod.ts";

const netzo = Netzo();

let count = 0;
netzo.cron("hello-world", "*/1 * * * *", () => {
  console.log("count:", count++);
});

Deno.serve((_request: Request): Response => {
  return Response.json({ count, ts: new Date().toISOString() });
});
