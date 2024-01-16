import { Netzo } from "netzo/platform/mod.ts";

export const netzo = await Netzo({
  projectId: Deno.env.get("NETZO_PROJECT_ID")!,
  apiKey: Deno.env.get("NETZO_API_KEY")!,
  baseURL: Deno.env.get("NETZO_API_URL")!,
}); // [optional] loaded from .env file

let count = 0;
netzo.cron(
  "count",
  "*/1 * * * *",
  () => console.log(`count: ${count++}`)
);

Deno.serve(() => Response.json({ count }));
