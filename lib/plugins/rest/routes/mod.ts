import type { PluginRoute } from "$fresh/server.ts";
import { deepParseJson } from "npm:deep-parse-json@2.0.0";
import { unflatten } from "npm:flat@6.0.1";
import { join } from "../../../deps/std/path/mod.ts";
import { netzodb } from "../../../integrations/databases/netzodb.ts";
import type { RestConfig } from "../plugin.ts";
import { parseRequestBody, RESPONSES } from "../utils.ts";

export const getRoutesByCollection = (
  collection: RestConfig["collections"][number],
  options: RestConfig,
): PluginRoute[] => {
  const {
    name,
    methods = ["find", "get", "create", "update", "patch", "remove"],
  } = { ...options, ...collection };

  const db = netzodb();

  const routes: PluginRoute[] = [
    {
      path: join("/rest", name),
      handler: {
        GET: async (_req, ctx) => {
          if (!methods!.includes("find")) return RESPONSES.notAllowed();
          // supports MongoDB-like URL queries via dot-notation (powered by mingo)
          // e.g. GET /rest/deals?contactIds.$in=["01HS1HVHBT0XKD8X6BYJ956NR6"]
          // flatQuery: { "contactIds.$in": '["01HS1HVHBT0XKD8X6BYJ956NR6"]' }
          // nestedQuery: { "contactIds.$in": '["01HS1HVHBT0XKD8X6BYJ956NR6"]' }
          // query: { contactIds: { "$in": [ "01HS1HVHBT0XKD8X6BYJ956NR6" ] } }
          const flatQuery = Object.fromEntries(ctx.url.searchParams);
          const nestedQuery = unflatten(flatQuery) as Record<string, unknown>;
          const query = deepParseJson(nestedQuery) as Record<string, unknown>;
          const result = await db.find(name, query);
          return Response.json(result);
        },
        POST: async (req, _ctx) => {
          if (!methods!.includes("create")) return RESPONSES.notAllowed();
          const data = await parseRequestBody(req);
          const result = await db.create(name, data);
          return Response.json(result);
        },
      },
    } satisfies PluginRoute,
    {
      path: join("/rest", name, "[id]"),
      handler: {
        GET: async (_req, ctx) => {
          if (!methods!.includes("get")) return RESPONSES.notAllowed();
          const { id } = ctx.params;
          const result = await db.get(name, id);
          return Response.json(result);
        },
        PUT: async (req, ctx) => {
          if (!methods!.includes("update")) return RESPONSES.notAllowed();
          const { id } = ctx.params;
          const data = await parseRequestBody(req);
          const result = await db.update(name, id, data);
          return Response.json(result);
        },
        PATCH: async (req, ctx) => {
          if (!methods!.includes("patch")) return RESPONSES.notAllowed();
          const { id } = ctx.params;
          const data = await parseRequestBody(req);
          const result = await db.patch(name, id, data);
          return Response.json(result);
        },
        DELETE: async (_req, ctx) => {
          if (!methods!.includes("remove")) return RESPONSES.notAllowed();
          const { id } = ctx.params;
          await db.remove(name, id);
          return Response.json({ ok: true });
        },
      },
    } satisfies PluginRoute,
  ];

  return routes;
};
