import type { PluginRoute } from "$fresh/server.ts";
import { join } from "../../../deps/std/path/mod.ts";
import { netzodb } from "../../../integrations/databases/netzodb.ts";
import type { ApiConfig } from "../plugin.ts";
import { parseRequestBody, parseSearchParams, RESPONSES } from "../utils.ts";

export const getRoutesByCollection = (
  collection: ApiConfig["collections"][number],
  options: ApiConfig,
): PluginRoute[] => {
  const {
    kv,
    name,
    idField = "id",
    methods = ["find", "get", "create", "update", "patch", "remove"],
  } = { ...options, ...collection };

  const db = netzodb();

  const routes: PluginRoute[] = [
    {
      path: join("/api", name),
      handler: {
        GET: async (_req, ctx) => {
          const { params, query } = parseSearchParams(ctx.url.searchParams);
          if (!methods!.includes("find")) return RESPONSES.notAllowed();
          const result = await db.find(name, query);
          return Response.json(result);
        },
        POST: async (req, ctx) => {
          const { params } = parseSearchParams(ctx.url.searchParams);
          if (!methods!.includes("create")) return RESPONSES.notAllowed();
          const data = await parseRequestBody(req);
          const result = await db.create(name, data, idField);
          return Response.json(result);
        },
      },
    } satisfies PluginRoute,
    {
      path: join("/api", name, "[id]"),
      handler: {
        GET: async (_req, ctx) => {
          if (!methods!.includes("get")) return RESPONSES.notAllowed();
          const { [idField]: id } = ctx.params;
          const result = await db.get(name, id);
          return Response.json(result);
        },
        PUT: async (req, ctx) => {
          const { params } = parseSearchParams(ctx.url.searchParams);
          if (!methods!.includes("update")) return RESPONSES.notAllowed();
          const { [idField]: id } = ctx.params;
          const data = await parseRequestBody(req);
          const result = await db.update(name, id, data);
          return Response.json(result);
        },
        PATCH: async (req, ctx) => {
          const { params } = parseSearchParams(ctx.url.searchParams);
          if (!methods!.includes("patch")) return RESPONSES.notAllowed();
          const { [idField]: id } = ctx.params;
          const data = await parseRequestBody(req);
          const result = await db.patch(name, id, data);
          return Response.json(result);
        },
        DELETE: async (_req, ctx) => {
          const { params } = parseSearchParams(ctx.url.searchParams);
          if (!methods!.includes("remove")) return RESPONSES.notAllowed();
          const { [idField]: id } = ctx.params;
          await db.remove(name, id);
          return Response.json({ ok: true });
        },
      },
    } satisfies PluginRoute,
  ];

  return routes;
};
