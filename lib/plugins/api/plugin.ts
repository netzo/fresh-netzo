import type { Plugin, PluginRoute } from "../../deps/$fresh/server.ts";
import {
  hooks as _hooks,
  Middleware,
  middleware,
} from "../../deps/@feathersjs/hooks.ts";
import type { Method, Resource } from "./resources/mod.ts";
import { parseRequestBody, parseSearchParams } from "./utils.ts";

export * from "./hooks/mod.ts";
export * from "./resources/mod.ts";
export * from "./errors.ts";
export * from "./plugin.ts";
export * from "./utils.ts";

export type ApiEndpoint = {
  /** The field name to use as the primary key. Defaults to "id". */
  idField?: string;
  /** The resource instance to use for performing RESTful operations. */
  resource: Resource;
  /** An object mapping resource names an array of hooks to apply to the resource. */
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

export const defineAPIEndpoint = (options: ApiEndpoint): ApiEndpoint => options;

export type ApiConfig = {
  /** The route path to mount the API on. Defaults to "/api". */
  path?: string;
  /** An object mapping resource names to resources instances. */
  endpoints: Record<string, ApiEndpoint>;
};

export type ApiState = {
  [key: string]: Resource;
};

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/api` route path.
 *
 * A fresh plugin that creates handlers for the following routes:
 * - `GET /api/{resource}` find all records matching query
 * - `GET /api/{resource}/{id}` get an entry by key
 * - `POST /api/{resource}` create a new entry (auto-generates id)
 * - `PUT /api/{resource}/{id}` update an entry by key
 * - `PATCH /api/{resource}/{id}` patch an entry by key
 * - `DELETE /api/{resource}/{id}` remove an entry by key
 */
export const api = (options?: ApiConfig): Plugin => {
  if (!options) return { name: "api" };

  const { path = "/api", endpoints = {} } = options ?? {};

  const routes: Plugin["routes"] = [];
  Object.entries(endpoints!).forEach(([name, endpoint]) => {
    const { idField = "id", resource, hooks } = endpoint ?? {};
    routes.push(...[
      {
        path: `${path}/${name}`,
        handler: {
          GET: async (req, ctx) => {
            const find = hookify(
              "find",
              name,
              resource,
              hooks,
              req,
            ) as typeof resource.find;
            const { params: _, query } = parseSearchParams(
              ctx.url.searchParams,
            );
            const result = await find(query);
            return Response.json(result);
          },
          POST: async (req, ctx) => {
            const create = hookify(
              "create",
              name,
              resource,
              hooks,
              req,
            ) as typeof resource.create;
            const { params: _ } = parseSearchParams(ctx.url.searchParams);
            const data = await parseRequestBody(req);
            const result = await create(data);
            return Response.json(result);
          },
        },
      } satisfies PluginRoute,
      {
        path: `${path}/${name}/[id]`,
        handler: {
          GET: async (req, ctx) => {
            const get = hookify(
              "get",
              name,
              resource,
              hooks,
              req,
            ) as typeof resource.get;
            const { params: _ } = parseSearchParams(ctx.url.searchParams);
            const result = await get(ctx.params[idField]);
            return Response.json(result);
          },
          PUT: async (req, ctx) => {
            const update = hookify(
              "update",
              name,
              resource,
              hooks,
              req,
            ) as typeof resource.update;
            const { params: _ } = parseSearchParams(ctx.url.searchParams);
            const data = await parseRequestBody(req);
            const result = await update(ctx.params[idField], data);
            return Response.json(result);
          },
          PATCH: async (req, ctx) => {
            const patch = hookify(
              "patch",
              name,
              resource,
              hooks,
              req,
            ) as typeof resource.patch;
            const { params: _ } = parseSearchParams(ctx.url.searchParams);
            const data = await parseRequestBody(req);
            const result = await patch(ctx.params[idField], data);
            return Response.json(result);
          },
          DELETE: async (req, ctx) => {
            const remove = hookify(
              "remove",
              name,
              resource,
              hooks,
              req,
            ) as typeof resource.remove;
            const { params: _ } = parseSearchParams(ctx.url.searchParams);
            const result = await remove(ctx.params[idField]);
            return Response.json(result);
          },
        },
      } satisfies PluginRoute,
    ]);
  });

  return {
    name: "api",
    middlewares: [
      {
        path: path!,
        middleware: {
          // error handling middleware:
          handler: async (_req, ctx) => {
            try {
              return await ctx.next();
            } catch (error) {
              if ("toJSON" in error && typeof error.toJSON === "function") {
                const { name, message, code } = error;
                return new Response(`${name}: ${message}`, { status: code });
              }
              return new Response(error.message, { status: 500 });
            }
          },
        },
      },
    ],
    routes,
  };
};

function hookify(
  method: Method,
  name: string,
  resource: ApiEndpoint["resource"],
  hooks: ApiEndpoint["hooks"],
  req: Request,
) {
  return _hooks(
    resource[method],
    middleware([
      ...(hooks?.all ? hooks.all : []),
      ...(hooks?.[method] ? hooks[method]! : []),
    ])
      .defaults((_self, _args, _context) => {
        return {
          method,
          name,
          resource,
          req,
        };
      }),
  );
}
