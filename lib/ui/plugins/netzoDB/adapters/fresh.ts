import { z } from "zod/mod.ts";
import type { Handlers } from "$fresh/server.ts";
import type { PluginRoute } from "$fresh/src/server/types.ts";
import { multiSet } from "https://deno.land/x/kv_utils@1.1.1/mod.ts";
import type { NetzoDBOptions, NetzoDBServiceOptions } from "../mod.ts";
// import * as db from "../../../../db/mod.ts";

const kv = await Deno.openKv();
const METHODS = ["find", "get", "create", "update", "patch", "remove"];
const notAllowed = () => new Response("Method not allowed", { status: 405 });
const notFound = (id: string) => new Response(`Not found ${id}`, { status: 404 });

export const generateRoutes = (options: NetzoDBOptions) => {
  const generateHandler = <T>(
    service: NetzoDBServiceOptions,
  ): Handlers<T | null> => {
    const {
      name,
      idField = options.idField || "id",
      methods = options.methods ?? METHODS,
    } = service;
    return {
      async GET(_req, _ctx) {
        if (!methods.includes("find")) return notAllowed();
        const records = await kv.list<T>({ prefix: [name] });
        const data = [];
        for await (const res of records) data.push(res.value as T);
        return Response.json(data);
      },
      async POST(req, _ctx) {
        if (!methods.includes("create")) return notAllowed();
        const data = await req.json();
        if (Array.isArray(data)) {
          const keyValues: Map<Deno.KvKey, unknown> = new Map();
          for (const item of data) {
            const id = String(item[idField]) || crypto.randomUUID();
            keyValues.set([name, id], item);
          }
          const result = await multiSet(keyValues);
          if (!result.ok) throw new Error(`Failed to set keys: ${result.failedKeys}`);
          return Response.json(data);
        } else {
          const id = String(data[idField]) || crypto.randomUUID();
          const key = [name, id];
          const ok = await kv.atomic().set(key, data).commit();
          if (!ok) throw new Error("Something went wrong.");
          return Response.json(data);
        }
      },
    };
  };

  const generateHandlerWithId = <T>(
    service: NetzoDBServiceOptions,
  ): Handlers<T | null> => {
    const {
      name,
      idField = options.idField || "id",
      methods = options.methods ?? METHODS,
    } = service;
    return {
      async GET(_req, ctx) {
        if (!methods.includes("get")) return notAllowed();
        const id = ctx.params[idField];
        const key = [name, id];
        const data = (await kv.get<T>(key)).value!;
        return Response.json(data);
      },
      async PUT(req, ctx) {
        if (!methods.includes("update")) return notAllowed();
        const id = ctx.params[idField];
        const data = (await req.json()) as T;
        const dataKey = [name, id];
        const dataRes = await kv.get(dataKey);
        if (!dataRes.value) return notFound(id);
        const ok = await kv.atomic().check(dataRes).set(dataKey, data).commit();
        if (!ok) throw new Error("Something went wrong.");
        return Response.json(data);
      },
      async PATCH(req, ctx) {
        if (!methods.includes("patch")) return notAllowed();
        const id = ctx.params[idField];
        const data = (await req.json()) as T;
        const dataKey = [name, id];
        const dataRes = await kv.get(dataKey);
        if (!dataRes.value) return notFound(id);
        const ok = await kv.atomic().check(dataRes).set(dataKey, data).commit();
        if (!ok) throw new Error("Something went wrong.");
        return Response.json(data);
      },
      async DELETE(_req, ctx) {
        if (!methods.includes("remove")) return notAllowed();
        const id = ctx.params[idField];
        const dataKey = [name, id];
        const dataRes = await kv.get(dataKey);
        if (!dataRes.value) return notFound(id);
        const ok = await kv.atomic().check(dataRes).delete(dataKey).commit();
        if (!ok) throw new Error("Something went wrong.");
        return new Response(`Deleted ${id}`, { status: 200 });
      },
    };
  };

  return options.services.flatMap(
    (service: NetzoDBServiceOptions): PluginRoute[] => {
      return [
        {
          path: `/${options.prefix}/${service.name}`,
          handler: generateHandler<z.infer<typeof service.schema>>(service),
        },
        {
          path: `/${options.prefix}/${service.name}/:id`,
          handler: generateHandlerWithId<z.infer<typeof service.schema>>(
            service,
          ),
        },
      ];
    },
  );
};
