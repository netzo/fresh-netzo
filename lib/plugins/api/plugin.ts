import type {
  FreshContext,
  Plugin,
  PluginRoute,
} from "../../deps/$fresh/server.ts";
import {
  hooks as _hooks,
  Middleware,
  middleware,
} from "../../deps/@feathersjs/hooks.ts";
import type { NetzoState } from "../../mod.ts";
import type { Resource } from "./resources/mod.ts";
import {
  type Methods,
  parseRequestBody,
  parseSearchParams,
  RESPONSES,
} from "./utils.ts";

export type ApiEndpoint = {
  /** The field name to use as the primary key. Defaults to "id". */
  idField?: string;
  /** The resource instance to use for performing RESTful operations. */
  resource: Resource;
  /** An object mapping resource names an array of hooks to apply to the resource. */
  hooks?: Record<Methods[number], Middleware[]>;
};

export const defineAPIEndpoint = (options: ApiEndpoint): ApiEndpoint => options;

export type ApiConfig = {
  /** The route path to mount the API on. Defaults to "/api". */
  path?: string;
  /** An object mapping resource names to resources instances. */
  endpoints: Record<Methods[number], ApiEndpoint>;
};

export type ApiState = {
  [key: string]: Resource;
};

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/api` route path.
 *
 * A fresh plugin that creates handlers for the following routes:
 * - `GET /api/{resourceName}` find all records matching query
 * - `GET /api/{resourceName}/{id}` get an entry by key
 * - `POST /api/{resourceName}` create a new entry (auto-generates id)
 * - `PUT /api/{resourceName}/{id}` update an entry by key
 * - `PATCH /api/{resourceName}/{id}` patch an entry by key
 * - `DELETE /api/{resourceName}/{id}` remove an entry by key
 */
export const api = (options?: ApiConfig): Plugin => {
  if (!options) return { name: "api" };

  const { path = "/api", endpoints = {} } = options ?? {};

  const routes: Plugin["routes"] = [];
  Object.entries(endpoints!).forEach(([resourceName, resourceOptions]) => {
    const { idField, resource, hooks = {} } = resourceOptions ?? {};
    routes.push(...[
      {
        path: `${path}/${resourceName}`,
        handler: {
          GET: resource?.find
            ? async (req, ctx) => {
              const find = hookify("find", resource, hooks, req, ctx);
              const { params: _, query } = parseSearchParams(
                ctx.url.searchParams,
              );
              const result = await find(query);
              return Response.json(result);
            }
            : () => RESPONSES.notImplemented(),
          POST: resource?.create
            ? async (req, ctx) => {
              const create = hookify("create", resource, hooks, req, ctx);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await create(data);
              return Response.json(result);
            }
            : () => RESPONSES.notImplemented(),
        },
      } satisfies PluginRoute,
      {
        path: `${path}/${resourceName}/[id]`,
        handler: {
          GET: resource?.get
            ? async (req, ctx) => {
              const get = hookify("get", resource, hooks, req, ctx);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const result = await get(ctx.params.id);
              return Response.json(result);
            }
            : () => RESPONSES.notImplemented(),
          PUT: resource?.update
            ? async (req, ctx) => {
              const update = hookify("update", resource, hooks, req, ctx);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await update(ctx.params.id, data);
              return Response.json(result);
            }
            : () => RESPONSES.notImplemented(),
          PATCH: resource?.patch
            ? async (req, ctx) => {
              const patch = hookify("patch", resource, hooks, req, ctx);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await patch(ctx.params.id, data);
              return Response.json(result);
            }
            : () => RESPONSES.notImplemented(),
          DELETE: resource?.remove
            ? async (req, ctx) => {
              const remove = hookify("remove", resource, hooks, req, ctx);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const result = await remove(ctx.params.id);
              return Response.json(result);
            }
            : () => RESPONSES.notImplemented(),
        },
      } satisfies PluginRoute,
    ]);
  });

  return { name: "api", routes };
};

function hookify(
  method: Methods[number],
  resource: ApiEndpoint["resource"],
  hooks: ApiEndpoint["hooks"],
  req: Request,
  ctx: FreshContext<NetzoState>,
) {
  return _hooks(
    resource[method],
    middleware([
      ...hooks.all,
      ...hooks[method],
    ])
      .params("req")
      .params("ctx")
      .params("method")
      .defaults((self, args, context) => {
        return { req, ctx, method };
      }),
  );
}
