const data = Deno.env.get("NETZO_PROJECT") ?? "{}";
const json = JSON.parse(data);
Deno.serve(() => Response.json(json));
