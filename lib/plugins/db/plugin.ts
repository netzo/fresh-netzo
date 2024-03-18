import type { Plugin } from "../../deps/$fresh/server.ts";
import { AsyncMiddleware } from "../../deps/@feathersjs/hooks.ts";
import { getRoutesByCollection } from "./routes/mod.ts";

export type DbCollection<T = Record<string, unknown>> = {
  /** The name of the collection e.g. "users" `/api/users`. */
  name: string;
  /** Wether to require authentication using the provided API key
   * in the "x-api-key" header or "apiKey" query parameter.
   * IMPORTANT: set "apiKey" using Deno.env.get(...) to keep it secret.
   * Defaults to Deno.env.get("NETZO_API_KEY"). */
  apiKey?: string;
  /** The field name to use as the primary key. Defaults to "id". */
  idField?: string;
  /** The methods to enable. Defaults to all methods. */
  methods?: ("find" | "get" | "create" | "update" | "patch" | "remove")[];
  /** An array of hooks or hooks manager to wrap the original method call. */
  hooks?: {
    all?: AsyncMiddleware[];
    find?: AsyncMiddleware[];
    get?: AsyncMiddleware[];
    create?: AsyncMiddleware[];
    update?: AsyncMiddleware[];
    patch?: AsyncMiddleware[];
    remove?: AsyncMiddleware[];
  };
};

export const defineDbCollection = (
  options: DbCollection,
): DbCollection => options;

export type DbConfig = Omit<DbCollection, "name" | "hooks"> & {
  /** A Deno KV instance to use for the database */
  kv: Deno.Kv;
  /** The route path to mount the API on. Defaults to "/api". */
  path?: `/${string}`;
  /** An array of database collections. */
  collections: DbCollection[];
};

export const defineDbConfig = (config: DbConfig): DbConfig =>
  config;

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

  config.path ??= "/api";
  config.idField ??= "id";
  config.methods ??= ["find", "get", "create", "update", "patch", "remove"];
  config.collections ||= [];

  const dbRoutes = [
    ...config.collections
      .filter((collection) => !!collection?.name)
      .flatMap((collection) => getRoutesByCollection(collection, config)),
  ];

  return {
    name: "netzo.db",
    routes: dbRoutes,
  };
};
