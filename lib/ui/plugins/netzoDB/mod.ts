import { HandlerProps } from "https://deno.land/x/kv_api@0.0.3/fresh.ts";
import generateFreshHandlers from "./adapters/fresh.ts";
import type { Plugin } from "$fresh/server.ts";

export interface NetzoDBOptions extends HandlerProps {
  prefix: string;
}

export const netzoDB = (options: NetzoDBOptions): Plugin => {
  return {
    name: "netzoDB",
    routes: [{
      path: options.prefix,
      handler: generateFreshHandlers({ prefix: options.prefix }),
    }],
  };
};

