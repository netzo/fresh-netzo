import type { Plugin, PluginRoute } from "../../deps/$fresh/server.ts";
import {
  hooks as _hooks,
  Middleware,
  middleware,
} from "../../deps/@feathersjs/hooks.ts";
import type { Resource } from "./resources/mod.ts";
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

export const defineApiEndpoint = (options: ApiEndpoint): ApiEndpoint => options;

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
    const {
      all: allHooks = [],
      find: findHooks = [],
      get: getHooks = [],
      create: createHooks = [],
      update: updateHooks = [],
      patch: patchHooks = [],
      remove: removeHooks = [],
    } = hooks ?? {};
    routes.push(...[
      {
        path: `${path}/${name}`,
        handler: {
          GET: async (request, ctx) => {
            const find = _hooks(
              resource.find,
              middleware([...allHooks, ...findHooks]),
            );
            const findCtx = find.createContext({
              method: "find",
              name,
              resource,
              request,
              url: ctx.url,
            });
            const { params: _, query } = parseSearchParams(
              ctx.url.searchParams,
            );
            // const finalCtx = await find(query);
            const finalCtx = await find(query, findCtx);
            return Response.json(finalCtx.result);
          },
          POST: async (request, ctx) => {
            const create = _hooks(
              resource.create,
              middleware([...allHooks, ...createHooks]),
            );
            const createCtx = create.createContext({
              method: "create",
              name,
              resource,
              request,
              url: ctx.url,
            });
            const { params: _ } = parseSearchParams(ctx.url.searchParams);
            const data = await parseRequestBody(request);
            const finalCtx = await create(data, createCtx);
            return Response.json(finalCtx.result);
          },
        },
      } satisfies PluginRoute,
      {
        path: `${path}/${name}/[id]`,
        handler: {
          GET: async (request, ctx) => {
            const get = _hooks(
              resource.get,
              middleware([...allHooks, ...getHooks]),
            );
            const getCtx = get.createContext({
              method: "get",
              name,
              resource,
              request,
              url: ctx.url,
            });
            const { params: _ } = parseSearchParams(ctx.url.searchParams);
            const finalCtx = await get(ctx.params[idField], getCtx);
            return Response.json(finalCtx.result);
          },
          PUT: async (request, ctx) => {
            const update = _hooks(
              resource.update,
              middleware([...allHooks, ...updateHooks]),
            );
            const updateCtx = update.createContext({
              method: "update",
              name,
              resource,
              request,
              url: ctx.url,
            });
            const { params: _ } = parseSearchParams(ctx.url.searchParams);
            const data = await parseRequestBody(request);
            const finalCtx = await update(ctx.params[idField], data, updateCtx);
            return Response.json(finalCtx.result);
          },
          PATCH: async (request, ctx) => {
            const patch = _hooks(
              resource.patch,
              middleware([...allHooks, ...patchHooks]),
            );
            const patchCtx = patch.createContext({
              method: "patch",
              name,
              resource,
              request,
              url: ctx.url,
            });
            const { params: _ } = parseSearchParams(ctx.url.searchParams);
            const data = await parseRequestBody(request);
            const finalCtx = await patch(ctx.params[idField], data, patchCtx);
            return Response.json(finalCtx.result);
          },
          DELETE: async (request, ctx) => {
            const remove = _hooks(
              resource.remove,
              middleware([...allHooks, ...removeHooks]),
            );
            const removeCtx = remove.createContext({
              method: "remove",
              name,
              resource,
              request,
              url: ctx.url,
            });
            const { params: _ } = parseSearchParams(ctx.url.searchParams);
            const finalCtx = await remove(ctx.params[idField], removeCtx);
            return Response.json(finalCtx.result);
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
          handler: async (_request, ctx) => {
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
