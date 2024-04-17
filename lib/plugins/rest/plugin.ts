import type { Plugin } from "$fresh/server.ts";
import { apiKeyAuthentication, cors } from "./middlewares/mod.ts";
import { getRoutesByCollection } from "./routes/mod.ts";

export type RestConfig = {
  /** Wether to require authentication using the provided API key in the
   * "x-api-key" header or "apiKey" query parameter. To disable authentication
   * set to `undefined`, otherwise it is recommended to set using Deno.env.get().
   * Defaults to Deno.env.get("NETZO_API_KEY"). */
  apiKey?: string;
  /** An array of database collections. */
  collections: {
    /** The name of the collection e.g. "users" `/rest/users`. */
    name: string;
    /** The methods to enable. Defaults to all methods. */
    methods?: ("find" | "get" | "create" | "update" | "patch" | "remove")[];
  }[];
};

export const defineRestConfig = (config: RestConfig): RestConfig => config;

// deno-lint-ignore ban-types
export type RestState = {};

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/rest` route path.
 *
 * - `GET /rest/:collection` find all records matching query
 * - `GET /rest/:collection/:id` get an entry by key
 * - `POST /rest/:collection` create a new entry (auto-generates id)
 * - `PUT /rest/:collection/:id` update an entry by key
 * - `PATCH /rest/:collection/:id` patch an entry by key
 * - `DELETE /rest/:collection/:id` remove an entry by key
 */
export const rest = (config?: RestConfig): Plugin => {
  if (!config) return { name: "netzo.rest" };

  // allows explicitly disabling apiKey authentication by setting
  // to `undefined` but defauls to NETZO_API_KEY for security
  if (!("apiKey" in config)) config.apiKey = Deno.env.get("NETZO_API_KEY");
  config.collections ??= [];

  const restRoutes = [
    ...config.collections
      .filter((collection) => !!collection?.name)
      .flatMap((collection) => getRoutesByCollection(collection, config)),
  ];

  return {
    name: "netzo.rest",
    middlewares: [
      {
        path: "/rest",
        middleware: {
          handler: cors(config),
        },
      },
      {
        path: "/rest",
        middleware: {
          handler: apiKeyAuthentication(config),
        },
      },
    ],
    routes: restRoutes,
  };
};
