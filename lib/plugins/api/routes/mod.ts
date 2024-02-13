import type { PluginRoute } from "../../../deps/$fresh/server.ts";
import { hooks, middleware } from "../../../deps/@feathersjs/hooks.ts";
import type { ApiConfig } from "../plugin.ts";
import { parseRequestBody, parseSearchParams } from "../utils.ts";

export const getRoutesByEndpoint = (
  endpoint: string,
  options: ApiConfig,
): PluginRoute[] => {
  const { path, idField = "id", resource } = endpoint;
  const {
    all: allHooks = [],
    find: findHooks = [],
    get: getHooks = [],
    create: createHooks = [],
    update: updateHooks = [],
    patch: patchHooks = [],
    remove: removeHooks = [],
  } = endpoint?.hooks ?? {};

  const routes: PluginRoute[] = [
    {
      path: `${options.path}/${path}`,
      handler: {
        GET: async (request, ctx) => {
          const find = hooks(
            resource.find,
            middleware([...allHooks, ...findHooks]),
          );
          const findCtx = find.createContext({
            method: "find",
            path,
            fullPath: `${options.path}/${path}`,
            idField,
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
          const create = hooks(
            resource.create,
            middleware([...allHooks, ...createHooks]),
          );
          const createCtx = create.createContext({
            method: "create",
            path,
            fullPath: `${options.path}/${path}`,
            idField,
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
      path: `${options.path}/${path}/[id]`,
      handler: {
        GET: async (request, ctx) => {
          const get = hooks(
            resource.get,
            middleware([...allHooks, ...getHooks]),
          );
          const getCtx = get.createContext({
            method: "get",
            path,
            fullPath: `${options.path}/${path}/[id]`,
            idField,
            resource,
            request,
            url: ctx.url,
          });
          const { params: _ } = parseSearchParams(ctx.url.searchParams);
          const finalCtx = await get(ctx.params[idField], getCtx);
          return Response.json(finalCtx.result);
        },
        PUT: async (request, ctx) => {
          const update = hooks(
            resource.update,
            middleware([...allHooks, ...updateHooks]),
          );
          const updateCtx = update.createContext({
            method: "update",
            path,
            fullPath: `${options.path}/${path}/[id]`,
            idField,
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
          const patch = hooks(
            resource.patch,
            middleware([...allHooks, ...patchHooks]),
          );
          const patchCtx = patch.createContext({
            method: "patch",
            path,
            fullPath: `${options.path}/${path}/[id]`,
            idField,
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
          const remove = hooks(
            resource.remove,
            middleware([...allHooks, ...removeHooks]),
          );
          const removeCtx = remove.createContext({
            method: "remove",
            path,
            fullPath: `${options.path}/${path}/[id]`,
            idField,
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
  ];

  return routes;
};
