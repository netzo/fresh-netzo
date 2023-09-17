import { z } from "zod/mod.ts";
import type { Handlers } from "$fresh/server.ts";
import type { PluginRoute } from "$fresh/src/server/types.ts";
import type { NetzoDBOptions, NetzoDBServiceOptions } from "../mod.ts";
import * as db from "../../../../db/mod.ts";

const METHODS = ["find", "get", "create", "update", "patch", "remove"];
const notAllowed = () => new Response("Method not allowed", { status: 405 });

export const generateRoutes = (options: NetzoDBOptions) => {
  const { prefix: _, ...serviceOptionDefaults } = options;
  options = {
    ...options,
    services: options.services.map(({ name, ...serviceOptions }) => ({
      name: name.toLowerCase().replace(/\s/g, "-"), // convert to kebab-case
      ...serviceOptionDefaults,
      ...serviceOptions,
    })),
  }

  const generateHandlerConfig = (): Handlers => {
    return {
      GET(_req, _ctx) {
        return Response.json(options);
      },
    };
  };

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
        const result = await db.find<T>(name, {});
        return Response.json(result);
      },
      async POST(req, _ctx) {
        if (!methods.includes("create")) return notAllowed();
        const data = await req.json();
        const result = await db.create<T>(name, data, idField as keyof T);
        return Response.json(result);
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
        const result = await db.get(name, id);
        return Response.json(result);
      },
      async PUT(req, ctx) {
        if (!methods.includes("update")) return notAllowed();
        const id = ctx.params[idField];
        const data = (await req.json()) as T;
        const result = await db.update<T>(name, id, data);
        return Response.json(result);
      },
      async PATCH(req, ctx) {
        if (!methods.includes("patch")) return notAllowed();
        const id = ctx.params[idField];
        const data = (await req.json()) as T;
        const result = await db.patch<T>(name, id, data);
        return Response.json(result);
      },
      async DELETE(_req, ctx) {
        if (!methods.includes("remove")) return notAllowed();
        const id = ctx.params[idField];
        await db.remove<T>(name, id);
        return new Response(`Deleted ${id}`, { status: 200 });
      },
    };
  };

  const routes = options.services.flatMap(
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

  return [
    {
      path: `/${options.prefix}/__config`,
      handler: generateHandlerConfig(),
    },
    ...routes,
  ]
};
