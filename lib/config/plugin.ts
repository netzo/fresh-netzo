import type {
  FreshConfig,
  Plugin,
} from "https://deno.land/x/fresh@1.5.2/server.ts";
import {  type VisibilityOptions,  VisibilityState} from "../visibility/plugin.ts";
import { type AuthOptions, AuthState } from "../auth/plugin.ts";
import {  type DatabaseOptions,  DatabaseState } from "../database/plugin.ts";

export type NetzoConfig = FreshConfig & {
  project: string;
  entrypoint?: string;
  // modules:
  visibility: VisibilityOptions;
  auth: AuthOptions;
  database: DatabaseOptions;
  [k: string]: unknown;
};

export type NetzoState = {
  config: NetzoConfig;
  kv: Deno.Kv;
  // modules:
  visibility?: VisibilityState;
  auth?: AuthState;
  database?: DatabaseState;
};

/**
 * A fresh plugin that registers middleware to set the
 * ctx.state.config property (once) on each request.
 */
export const configPlugin = (config: NetzoConfig): Plugin<NetzoState> => {
  return {
    name: "netzo",
    middlewares: [
      {
        path: "/",
        middleware: {
          handler: async (_req, ctx) => {
            if (!["route"].includes(ctx.destination)) return await ctx.next();

            // TODO: connect to specific KV namespace by project.databases[0].databaseId
            // e.g. await Deno.openKv("https://api.deno.com/databases/{databaseID}/connect");
            const kv = await Deno.openKv();

            const [visibility, auth, database] = await kv.getMany([
              ["netzo", "visibility", "config"],
              ["netzo", "auth", "config"],
              ["netzo", "database", "config"],
            ]);

            ctx.state = {
              config,
              kv,
              visibility: visibility?.value ?? undefined,
              auth: auth?.value ?? undefined,
              database: database?.value ?? undefined,
            } as NetzoState;

            return await ctx.next();
          },
        },
      },
    ],
  };
};