import { HandlerProps } from "https://deno.land/x/kv_api@0.0.3/fresh.ts";
import { generateFreshHandlers } from "https://deno.land/x/kv_api@0.0.3/mod.ts";
import type { Plugin } from "$fresh/server.ts";

// OPTION 1: use the resh API example at https://fresh.deno.dev/docs/examples/creating-a-crud-api
// as a starting point but provide a generateFreshHandlers function that takes in e.g. the
// endpoints and allowed methods as parameters, and returns the dynamically built handlers object
// OPTION 2: use the generateFreshHandlers of the kv_api package directly
// to allow dynamic creation of routes, but this is more RCP-like rather than REST-like
// so we should ideally use OPTION 1 and take inspiration from the kv_api package instead,
// we should also use feathers-rpc verb syntax e.g. GET /kv/users:list instead of
// GET /kv/users/list (see https://www.npmjs.com/package/feathers-rpc)

// see https://github.com/netzo/netzo/issues/10

export interface NetzoDenoKVOptions extends HandlerProps {
  prefix: string;
}

export const netzoDenoKV = (options: NetzoDenoKVOptions): Plugin => {
  return {
    name: "netzoDenoKV",
    routes: [{
      path: options.prefix,
      handler: generateFreshHandlers({ prefix: options.prefix }),
    }],
  };
};
