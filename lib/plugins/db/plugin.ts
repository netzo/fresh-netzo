import type { Plugin } from "../../deps/$fresh/server.ts";
import { getRoutesByCollection } from "./routes/mod.ts";
import { RESPONSES } from "./utils.ts";

export type DbConfig = {
  /** A Deno KV instance to use for the database */
  kv: Deno.Kv;
  /** Wether to require authentication using the provided API key
   * in the "x-api-key" header or "apiKey" query parameter.
   * Defaults to Deno.env.get("NETZO_API_KEY"). */
  apiKey?: string;
  /** An array of database collections. */
  collections: {
    /** The name of the collection e.g. "users" `/api/users`. */
    name: string;
    /** The field name to use as the primary key. Defaults to "id". */
    idField?: string;
    /** The methods to enable. Defaults to all methods. */
    methods?: ("find" | "get" | "create" | "update" | "patch" | "remove")[];
  }[];
};

export const defineDbConfig = (config: DbConfig): DbConfig => config;

// deno-lint-ignore ban-types
export type DbState = {};

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/api` route path.
 *
 * - `GET /api/:collection` find all records matching query
 * - `GET /api/:collection/:id` get an entry by key
 * - `POST /api/:collection` create a new entry (auto-generates id)
 * - `PUT /api/:collection/:id` update an entry by key
 * - `PATCH /api/:collection/:id` patch an entry by key
 * - `DELETE /api/:collection/:id` remove an entry by key
 */
export const db = (config?: DbConfig): Plugin => {
  if (!config) return { name: "netzo.db" };

  config.apiKey ??= Deno.env.get("NETZO_API_KEY");
  config.collections ??= [];

  const dbRoutes = [
    ...config.collections
      .filter((collection) => !!collection?.name)
      .flatMap((collection) => getRoutesByCollection(collection, config)),
  ];

  return {
    name: "netzo.db",
    middlewares: [
      {
        path: "/api",
        middleware: {
          handler: async (req, ctx) => {
            const { apiKey } = config;
            try {
              if (!["route"].includes(ctx.destination)) return await ctx.next();
              if (!apiKey) return await ctx.next();

              const origin = req.headers.get("origin")!; // e.g. https://my-project-906698.netzo.io
              const referer = req.headers.get("referer")!; // SOMETIMES SET e.g. https://app.netzo.io/some-path

              // skip if request is from same origin or referer (to allow fetch within app)
              const sameOrigin = origin && ctx.url.origin === origin;
              const sameReferer = referer &&
                referer?.startsWith(ctx.url.origin);
              if (sameOrigin || sameReferer) return await ctx.next();

              // API key authentication
              const apiKeyHeader = req.headers.get("x-api-key");
              const apiKeySearchParams = ctx.url.searchParams.get("apiKey");
              const apiKeyValue = apiKeyHeader || apiKeySearchParams;
              if (!apiKeyValue) return RESPONSES.missingApiKey();
              if (apiKeyValue !== apiKey) return RESPONSES.invalidApiKey();
              ctx.url.searchParams.delete("apiKey"); // remove apiKey from query

              return await ctx.next();
            } catch (error) {
              const { message, status = 500, headers } = error;
              return new Response(message, { status, headers });
            }
          },
        },
      },
    ],
    routes: dbRoutes,
  };
};
