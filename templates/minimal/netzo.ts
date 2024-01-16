import { Netzo } from "netzo/platform/mod.ts";

export const netzo = await Netzo({
  projectId: Deno.env.get("NETZO_PROJECT_ID")!,
  apiKey: Deno.env.get("NETZO_API_KEY")!,
}); // [optional] loaded from .env file

Deno.serve(() => Response.json({ message: "Hello World" }));
