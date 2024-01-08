export const PREFIX = ["netzo", Deno.env.get("NETZO_PROJECT_ID")] as Deno.KvKey;

// deno-lint-ignore no-explicit-any
export const enabled = (obj: any) => !!obj && obj?.enabled !== false;
