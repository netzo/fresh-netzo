import { Netzo } from "netzo/platform/mod.ts";

export const netzo = await Netzo({
  projectId: Deno.env.get("NETZO_PROJECT_ID")!,
  apiKey: Deno.env.get("NETZO_API_KEY")!,
}); // [optional] loaded from .env file

// NOTE: could also use the native `Deno.cron()` API instead of `netzo.cron()`
netzo.cron("job", "*/30 * * * *", () => console.log("Runs every 30 minutes"));

Deno.serve(() => Response.json({ message: "Hello World" }));
