// IMPORTANT: utils might be used by client-side code, so use IS_BROWSER to prevent
// server-only code from leaking to client (e.g. "Error: Deno is not defined")
import { IS_BROWSER } from "../../deps/$fresh/runtime.ts";

export const PREFIX = IS_BROWSER
  ? undefined
  : ["netzo", Deno.env.get("NETZO_PROJECT_ID")] as Deno.KvKey;

// deno-lint-ignore no-explicit-any
export const enabled = (obj: any) => !!obj && obj?.enabled !== false;
