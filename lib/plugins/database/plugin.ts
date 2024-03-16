import type { Plugin } from "../../deps/$fresh/server.ts";
import { getMiddlewaresByCollection } from "./middlewares/mod.ts";
import { getRoutesByCollection } from "./routes/mod.ts";

export type DatabaseCollection<T = Record<string, unknown>> = {
  /** A Deno KV instance to use for the database */
  kv: Deno.Kv;
  /** The name of the collection e.g. "users" `/db/users`. */
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
  /** A resolver function to modify the outgoing data */
  resolver?: (
    data: T,
  ) => Record<string, unknown> | Promise<Record<string, unknown>>;
};

export const defineDatabaseCollection = (
  options: DatabaseCollection,
): DatabaseCollection => options;

export type DatabaseConfig = Omit<DatabaseCollection, "name" | "resolver"> & {
  /** The route path to mount the API on. Defaults to "/db". */
  path?: `/${string}`;
  /** An array of database collections. */
  collections: DatabaseCollection[];
};

export const defineDatabaseConfig = (config: DatabaseConfig): DatabaseConfig =>
  config;

export type DatabaseState = {};

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/db` route path.
 *
 * - `GET /db/:collection` find all records matching query
 * - `GET /db/:collection/:id` get an entry by key
 * - `POST /db/:collection` create a new entry (auto-generates id)
 * - `PUT /db/:collection/:id` update an entry by key
 * - `PATCH /db/:collection/:id` patch an entry by key
 * - `DELETE /db/:collection/:id` remove an entry by key
 */
export const database = (config?: DatabaseConfig): Plugin => {
  if (!config) return { name: "netzo.database" };

  config.path ??= "/db";
  config.idField ??= "id";
  config.methods ??= ["find", "get", "create", "update", "patch", "remove"];
  config.collections ||= [];

  const databaseMiddleware = [
    ...config.collections
      .filter((collection) => !!collection?.name)
      .flatMap((collection) => getMiddlewaresByCollection(collection, config)),
  ];

  const databaseRoutes = [
    ...config.collections
      .filter((collection) => !!collection?.name)
      .flatMap((collection) => getRoutesByCollection(collection, config)),
  ];

  return {
    name: "netzo.database",
    middlewares: databaseMiddleware,
    routes: databaseRoutes,
  };
};
