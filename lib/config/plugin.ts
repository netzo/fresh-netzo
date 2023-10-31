import type { Plugin, FreshConfig } from "$fresh/server.ts";

export type NetzoConfig = FreshConfig & {
  project: string;
  entrypoint?: string;
  [k: string]: unknown;
};

export type NetzoState = {
  config: NetzoConfig;
  kv: Deno.Kv;
};

/**
 * A fresh plugin that registers middleware to set the
 * ctx.state.config property (once) on each request.
 */
export const configPlugin = (config: NetzoConfig): Plugin => {
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