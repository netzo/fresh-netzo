import type { Plugin } from "$fresh/server.ts";
import type { NetzoConfig } from "netzo/config.ts";
import { createDatabase } from "./mod.ts";
import { parseRequestBody } from "netzo/utils/mod.ts";

export type DatabaseServiceOptions = {
  name: string; // automatically converted to kebab-case
  idField?: string;
  methods?: Array<"find" | "get" | "create" | "update" | "patch" | "delete">;
};

export type DatabaseOptions = {
  idField?: DatabaseServiceOptions["idField"];
  methods?: DatabaseServiceOptions["methods"];
  services: DatabaseServiceOptions[];
};

// deno-lint-ignore no-empty-interface
export interface DatabaseState {}

const DENO_KV_PATH_KEY = "DENO_KV_PATH";

const path = (await Deno.permissions.query({
    name: "env",
    variable: DENO_KV_PATH_KEY,
  })).state === "granted"
  ? Deno.env.get(DENO_KV_PATH_KEY)
  : undefined;

const kv = await Deno.openKv(path);
const db = createDatabase(kv);

const METHODS = ["find", "get", "create", "update", "patch", "remove"];
const notAllowed = () => new Response("Method not allowed", { status: 405 });

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/db` route path.
 *
 * A fresh plugin that creates handlers for the following routes:
 * - `GET /db/[resource]` find all records of a resource
 * - `GET /db/[resource]/[id]` get a record of a resource by id
 * - `POST /db/[resource]` create a new record of a resource (auto-generates id)
 * - `PUT /db/[resource]/[id]` update a record of a resource by id
 * - `PATCH /db/[resource]/[id]` patch a record of a resource by id
 * - `DELETE /db/[resource]/[id]` delete a record of a resource by id
 */
export const databasePlugins = (_config: NetzoConfig): Plugin[] => {
  return [
    {
      name: "database-plugin",
      middlewares: [
        {
          path: "/db",
          middleware: {
            handler: async (req, ctx) => {
              if (!["route"].includes(ctx.destination)) return await ctx.next();
              const methods = METHODS; // TODO: get methods from ctx.state.database
              if (!methods.includes(req.method)) return notAllowed();
              return await ctx.next();
            },
          },
        },
      ],
      routes: [
        {
          path: `/db/[resource]`,
          handler: {
            async GET(_req, ctx) {
              const { resource } = ctx.params;
              const result = await db.find(resource, {});
              return Response.json(result);
            },
            async POST(req, ctx) {
              const { resource } = ctx.params;
              const data = await parseRequestBody(req);
              const result = await db.create(resource, data, "id");
              return Response.json(result);
            },
          },
        },
        {
          path: `/db/[resource]/[id]`,
          handler: {
            async GET(_req, ctx) {
              const { resource, id } = ctx.params;
              const result = await db.get(resource, id);
              return Response.json(result);
            },
            async PUT(req, ctx) {
              const { resource, id } = ctx.params;
              const data = await parseRequestBody(req);
              const result = await db.update(resource, id, data);
              return Response.json(result);
            },
            async PATCH(req, ctx) {
              const { resource, id } = ctx.params;
              const data = await parseRequestBody(req);
              const result = await db.patch(resource, id, data);
              return Response.json(result);
            },
            async DELETE(_req, ctx) {
              const { resource, id } = ctx.params;
              await db.remove(resource, id);
              return Response.json({ id });
            },
          },
        },
      ],
    },
  ];
};
