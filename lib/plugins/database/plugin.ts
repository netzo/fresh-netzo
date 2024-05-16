import type { Plugin, PluginRoute } from "$fresh/server.ts";
import { createClient } from "npm:@libsql/client@0.6.0";
import { apiKeyAuthentication, cors } from "../middleware.ts";
import { parseRequestBody } from "../utils.ts";

const {
  NETZO_API_KEY,
  NETZO_DATABASE_URL,
  NETZO_DATABASE_AUTH_TOKEN,
} = Deno.env.toObject();

export type DatabaseConfig = {
  /** Wether to require authentication using the provided API key in the
   * "x-api-key" header or "apiKey" query parameter. To disable authentication
   * set to `undefined`, otherwise it is recommended to set using Deno.env.get().
   * Defaults to Deno.env.get("NETZO_API_KEY"). */
  apiKey?: string;
};

// deno-lint-ignore ban-types
export type DatabaseState = {};

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/database` route path.
 *
 * - `GET /database/:table` find all records matching query
 * - `GET /database/:table/:id` get an entry by key
 * - `POST /database/:table` create a new entry (auto-generates id)
 * - `PUT /database/:table/:id` update an entry by key
 * - `PATCH /database/:table/:id` patch an entry by key
 * - `DELETE /database/:table/:id` remove an entry by key
 */
export const database = (config?: DatabaseConfig): Plugin => {
  if (!config) return { name: "netzo.database" };
  if (!("apiKey" in config)) config.apiKey = NETZO_API_KEY;

  const client = createClient({
    url: NETZO_DATABASE_URL!,
    authToken: NETZO_DATABASE_AUTH_TOKEN,
  });

  return {
    name: "netzo.database",
    middlewares: [
      {
        path: "/database",
        middleware: {
          handler: cors(),
        },
      },
      {
        path: "/database",
        middleware: {
          handler: apiKeyAuthentication({ apiKey: config.apiKey! }),
        },
      },
    ],
    routes: [
      {
        path: "/database",
        handler: {
          POST: async (req, _ctx) => {
            const {
              sql,
              params: args = [],
              method: _,
            } = await parseRequestBody(req);
            const result = await client.execute({ sql, args });
            return Response.json(result.rows);
          },
        },
      } satisfies PluginRoute,
    ],
  };
};
