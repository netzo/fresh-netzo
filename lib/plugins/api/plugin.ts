import type { Plugin, PluginRoute } from "../../deps/$fresh/server.ts";
import {
  hooks as _hooks,
  Middleware,
  middleware,
} from "../../deps/@feathersjs/hooks.ts";
import type { NetzoState } from "../../mod.ts";
import type { Method, Resource } from "./resources/mod.ts";
import { parseRequestBody, parseSearchParams } from "./utils.ts";
import { NotImplemented } from "./errors.ts";

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
  hooks?: Record<"all" | Method, Middleware[]>;
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
  Object.entries(endpoints!).forEach(([endpointPath, endpoint]) => {
    const { idField: _, resource, hooks } = endpoint ?? {};
    routes.push(...[
      {
        path: `${path}/${endpointPath}`,
        handler: {
          GET: resource?.find
            ? async (req, ctx) => {
              const find = hookify("find", resource, hooks, req, ctx.state);
              const { params: _, query } = parseSearchParams(
                ctx.url.searchParams,
              );
              const result = await find(query);
              console.log(result);
              return Response.json(result);
            }
            : () => {
              throw new NotImplemented("Method not implemented");
            },
          POST: resource?.create
            ? async (req, ctx) => {
              const create = hookify("create", resource, hooks, req, ctx.state);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await create(data);
              return Response.json(result);
            }
            : () => {
              throw new NotImplemented("Method not implemented");
            },
        },
      } satisfies PluginRoute,
      {
        path: `${path}/${endpointPath}/[id]`,
        handler: {
          GET: resource?.get
            ? async (req, ctx) => {
              const get = hookify("get", resource, hooks, req, ctx.state);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const result = await get(ctx.params.id);
              return Response.json(result);
            }
            : () => {
              throw new NotImplemented("Method not implemented");
            },
          PUT: resource?.update
            ? async (req, ctx) => {
              const update = hookify("update", resource, hooks, req, ctx.state);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await update(ctx.params.id, data);
              return Response.json(result);
            }
            : () => {
              throw new NotImplemented("Method not implemented");
            },
          PATCH: resource?.patch
            ? async (req, ctx) => {
              const patch = hookify("patch", resource, hooks, req, ctx.state);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await patch(ctx.params.id, data);
              return Response.json(result);
            }
            : () => {
              throw new NotImplemented("Method not implemented");
            },
          DELETE: resource?.remove
            ? async (req, ctx) => {
              const remove = hookify("remove", resource, hooks, req, ctx.state);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const result = await remove(ctx.params.id);
              return Response.json(result);
            }
            : () => {
              throw new NotImplemented("Method not implemented");
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
  resource: ApiEndpoint["resource"],
  hooks: ApiEndpoint["hooks"],
  req: Request,
  state: NetzoState,
) {
  return _hooks(
    resource[method],
    middleware([
      ...(hooks?.all ? hooks.all : []),
      ...(hooks?.[method] ? hooks[method] : []),
    ])
      .params("req")
      .params("ctx")
      .params("method")
      .defaults((_self, _args, _context) => {
        return { req, state, method };
      }),
  );
}
