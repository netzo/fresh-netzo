import type { PluginRoute } from "../../../deps/$fresh/server.ts";
import {
  hooks as hookify,
  middleware,
} from "../../../deps/@feathersjs/hooks.ts";
import { join } from "../../../deps/std/path/mod.ts";
import { createDatabase } from "../mod.ts";
import type { DbCollection, DbConfig } from "../plugin.ts";
import { ERRORS, parseRequestBody, parseSearchParams } from "../utils.ts";

export const getRoutesByCollection = (
  collection: DbCollection,
  options: DbConfig,
): PluginRoute[] => {
  const { kv, name, idField = "id", methods, hooks = {} } = {
    ...options,
    ...collection,
  };
  const {
    all: allHooks = [],
    find: findHooks = [],
    get: getHooks = [],
    create: createHooks = [],
    update: updateHooks = [],
    patch: patchHooks = [],
    remove: removeHooks = [],
  } = hooks;

  const db = createDatabase(kv);

  const routes: PluginRoute[] = [
    {
      path: join(options.path!, name),
      handler: {
        GET: async (request, ctx) => {
          if (!methods!.includes("find")) return ERRORS.notAllowed();
          const { params, query } = parseSearchParams(ctx.url.searchParams);
          const find = hookify(
            db.find,
            middleware([...allHooks, ...findHooks]),
          );
          const findCtx = find.createContext({
            method: "find",
            name,
            path: join(options.path!, name),
            idField,
            request,
            url: ctx.url,
            data: undefined,
          });
          const finalCtx = await find(name, query, findCtx);
          // validate to against $collections in Deno KV
          // const validate = await assertValid(result, query);
          return Response.json(finalCtx.result);
        },
        POST: async (request, ctx) => {
          if (!methods!.includes("create")) return ERRORS.notAllowed();
          const { params } = parseSearchParams(ctx.url.searchParams);
          const data = await parseRequestBody(request);
          const create = hookify(
            db.create,
            middleware([...allHooks, ...createHooks]),
          );
          const createCtx = create.createContext({
            method: "create",
            name,
            path: join(options.path!, name),
            idField,
            request,
            url: ctx.url,
            data,
          });
          const finalCtx = await create(name, data, idField, createCtx);
          return Response.json(finalCtx.result);
        },
      },
    } satisfies PluginRoute,
    {
      path: join(options.path!, name, "[id]"),
      handler: {
        GET: async (request, ctx) => {
          if (!methods!.includes("get")) return ERRORS.notAllowed();
          const { [idField]: id } = ctx.params;
          const get = hookify(db.get, middleware([...allHooks, ...getHooks]));
          const getCtx = get.createContext({
            method: "get",
            name,
            path: join(options.path!, name, "[id]"),
            idField,
            request,
            url: ctx.url,
            data: undefined,
          });
          const finalCtx = await get(name, id, getCtx);
          return Response.json(finalCtx.result);
        },
        PUT: async (request, ctx) => {
          const { params } = parseSearchParams(ctx.url.searchParams);
          if (!methods!.includes("update")) return ERRORS.notAllowed();
          const { [idField]: id } = ctx.params;
          const data = await parseRequestBody(request);
          const update = hookify(
            db.update,
            middleware([...allHooks, ...updateHooks]),
          );
          const updateCtx = update.createContext({
            method: "update",
            name,
            path: join(options.path!, name, "[id]"),
            idField,
            request,
            url: ctx.url,
            data,
          });
          const finalCtx = await update(name, ctx.params.id, data, updateCtx);
          return Response.json(finalCtx.result);
        },
        PATCH: async (request, ctx) => {
          const { params } = parseSearchParams(ctx.url.searchParams);
          if (!methods!.includes("patch")) return ERRORS.notAllowed();
          const { [idField]: id } = ctx.params;
          const data = await parseRequestBody(request);
          const patch = hookify(
            db.patch,
            middleware([...allHooks, ...patchHooks]),
          );
          const patchCtx = patch.createContext({
            method: "patch",
            name,
            path: join(options.path!, name, "[id]"),
            idField,
            request,
            url: ctx.url,
            data,
          });
          const finalCtx = await patch(name, ctx.params.id, data, patchCtx);
          return Response.json(finalCtx.result);
        },
        DELETE: async (request, ctx) => {
          const { params } = parseSearchParams(ctx.url.searchParams);
          if (!methods!.includes("remove")) return ERRORS.notAllowed();
          const { [idField]: id } = ctx.params;
          const remove = hookify(
            db.remove,
            middleware([...allHooks, ...removeHooks]),
          );
          await remove(name, id);
          return Response.json({ ok: true });
        },
      },
    } satisfies PluginRoute,
  ];

  return routes;
};
