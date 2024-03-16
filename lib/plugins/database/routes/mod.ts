import type { PluginRoute } from "../../../deps/$fresh/server.ts";
import { join } from "../../../deps/std/path/mod.ts";
import { createDatabase } from "../database.ts";
import type { DatabaseCollection, DatabaseConfig } from "../plugin.ts";
import { ERRORS, parseRequestBody, parseSearchParams } from "../utils.ts";

export const getRoutesByCollection = (
  collection: DatabaseCollection,
  options: DatabaseConfig,
): PluginRoute[] => {
  const { kv, name, idField = "id", methods } = { ...options, ...collection };

  const db = createDatabase(kv);

  const routes: PluginRoute[] = [
    {
      path: join(options.path!, name),
      handler: {
        GET: async (_req, ctx) => {
          const { params, query } = parseSearchParams(ctx.url.searchParams);
          if (!methods!.includes("find")) return ERRORS.notAllowed();
          const result = await db.find(name, query);
          // validate to against $collections in Deno KV
          // const validate = await db.assertValid(result, query);
          return Response.json(result);
        },
        POST: async (req, ctx) => {
          const { params } = parseSearchParams(ctx.url.searchParams);
          if (!methods!.includes("create")) return ERRORS.notAllowed();
          const data = await parseRequestBody(req);
          const result = await db.create(name, data, idField);
          return Response.json(result);
        },
      },
    } satisfies PluginRoute,
    {
      path: join(options.path!, name, "[id]"),
      handler: {
        GET: async (_req, ctx) => {
          if (!methods!.includes("get")) return ERRORS.notAllowed();
          const { [idField]: id } = ctx.params;
          const result = await db.get(name, id);
          return Response.json(result);
        },
        PUT: async (req, ctx) => {
          const { params } = parseSearchParams(ctx.url.searchParams);
          if (!methods!.includes("update")) return ERRORS.notAllowed();
          const { [idField]: id } = ctx.params;
          const data = await parseRequestBody(req);
          const result = await db.update(name, ctx.params.id, data);
          return Response.json(result);
        },
        PATCH: async (req, ctx) => {
          const { params } = parseSearchParams(ctx.url.searchParams);
          if (!methods!.includes("patch")) return ERRORS.notAllowed();
          const { [idField]: id } = ctx.params;
          const data = await parseRequestBody(req);
          const result = await db.patch(name, ctx.params.id, data);
          return Response.json(result);
        },
        DELETE: async (_req, ctx) => {
          const { params } = parseSearchParams(ctx.url.searchParams);
          if (!methods!.includes("remove")) return ERRORS.notAllowed();
          const { [idField]: id } = ctx.params;
          await db.remove(name, id);
          return Response.json({ ok: true });
        },
      },
    } satisfies PluginRoute,
  ];

  return routes;
};
