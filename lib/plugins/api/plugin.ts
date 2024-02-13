import type { Plugin } from "../../deps/$fresh/server.ts";
import { hooks as _hooks, Middleware } from "../../deps/@feathersjs/hooks.ts";
import type { Resource } from "./resources/mod.ts";
import { handleErrors } from "./middlewares/mod.ts";
import { getRoutesByEndpoint } from "./routes/mod.ts";

export type ApiEndpoint = {
  /** The name of the resource e.g. "users" (API endpoint will be mounted at `/api/{name}`). */
  name: string;
  /** The field name to use as the primary key. Defaults to "id". */
  idField?: string;
  /** The resource instance to use for performing RESTful operations. */
  resource: Resource;
  /** An object mapping resource methods to an array of hooks to apply. */
  hooks?: {
    all?: Middleware[];
    find?: Middleware[];
    get?: Middleware[];
    create?: Middleware[];
    update?: Middleware[];
    patch?: Middleware[];
    remove?: Middleware[];
  };
};

export const defineApiEndpoint = (options: ApiEndpoint): ApiEndpoint => options;

export type ApiConfig = {
  /** The route path to mount the API on. Defaults to "/api". */
  path?: `/${string}`;
  /** An array of API endpoint objects. */
  endpoints: ApiEndpoint[];
};

export type ApiState = {
  [key: string]: Resource;
};

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/api` route path.
 *
 * A fresh plugin that creates handlers for the following routes:
 * - `GET /api/{endpoint}` find all records matching query
 * - `GET /api/{endpoint}/{id}` get an entry by key
 * - `POST /api/{endpoint}` create a new entry (auto-generates id)
 * - `PUT /api/{endpoint}/{id}` update an entry by key
 * - `PATCH /api/{endpoint}/{id}` patch an entry by key
 * - `DELETE /api/{endpoint}/{id}` remove an entry by key
 */
export const api = (options?: ApiConfig): Plugin => {
  if (!options) return { name: "api" };

  options.path ||= "/api";
  options.endpoints ||= [];

  const apiRoutes = [
    ...options.endpoints
      .filter((endpoint) => !!endpoint?.name)
      .flatMap((endpoint) => getRoutesByEndpoint(endpoint, options)),
  ];

  return {
    name: "api",
    middlewares: [
      {
        path: options.path!,
        middleware: { handler: handleErrors },
      },
    ],
    routes: apiRoutes,
  };
};
