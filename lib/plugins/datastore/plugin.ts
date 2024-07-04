import type { App } from "fresh";
import { NetzoState } from "netzo/mod.ts";
import { datastore as createDatastore } from "../../datastore/mod.ts";
import { deepParseJson } from "../../deps/deep-parse-json.ts";
import { unflatten } from "../../deps/flat.ts";
import { apiKeyAuthentication, cors } from "../middleware.ts";
import { parseRequestBody, RESPONSES } from "../utils.ts";

export type DatastoreConfig = {
  /** Wether to require authentication using the provided API key in the
   * "x-api-key" header or "apiKey" query parameter. To disable authentication
   * set to `undefined`, otherwise it is recommended to set using Deno.env.get().
   * Defaults to Deno.env.get("NETZO_API_KEY") for security. */
  apiKey?: string;
};

// deno-lint-ignore ban-types
export type DatastoreState = {};

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/datastore` route path.
 *
 * - `GET /datastore/:prefix` find all records matching query
 * - `GET /datastore/:prefix/:id` get an entry by key
 * - `POST /datastore/:prefix` create a new entry (auto-generates id)
 * - `PUT /datastore/:prefix/:id` update an entry by key
 * - `PATCH /datastore/:prefix/:id` patch an entry by key
 * - `DELETE /datastore/:prefix/:id` remove an entry by key
 */
export const datastore = (app: App<NetzoState>, config?: DatastoreConfig) => {
  if (!config) return;

  if (!("apiKey" in config)) config.apiKey = Deno.env.get("NETZO_API_KEY");

  const ds = createDatastore();

  // middlewares:

  app.all("/datastore/:path*", cors());
  app.all("/datastore/:path*", apiKeyAuthentication({ apiKey: config.apiKey! }));

  // routes:

  // see @netzo/api/services/custom/kv/kv.class.ts
  app.post("/datastore", async (ctx) => {
    type KvData = {
      operation: "get" | "set" | "delete" | "list"; // | "sum" | "min" | "max";
      key: Deno.KvKey;
      value?: unknown;
      prefix?: Deno.KvKey;
      start?: Deno.KvKey;
      end?: Deno.KvKey;
      options?: {
        limit?: number;
        cursor?: string;
        reverse?: boolean;
        consistency?: "strong" | "eventual";
        batchSize?: number;
      };
    };
    const data = await parseRequestBody<KvData>(ctx.req);
    const { operation, value } = data ?? {};
    const key = data?.key as unknown as Deno.KvKey;

    switch (operation) {
      case "get": {
        const result = await ds.kv.get(key);
        return Response.json(result);
      }
      case "set": {
        const result = await ds.kv.set(key, value);
        return Response.json(result);
      }
      case "delete": {
        const result = await ds.kv.delete(key);
        return Response.json(result);
      }
      case "list": {
        const { prefix, start, end, options } = data ?? {};
        let iterator;
        if (start && end) {
          iterator = ds.kv.list({ start, end }, options);
        } else if (prefix && start) {
          iterator = ds.kv.list({ prefix, start }, options);
        } else if (prefix && end) {
          iterator = ds.kv.list({ prefix, end }, options);
        } else if (prefix) {
          iterator = ds.kv.list({ prefix }, options);
        } else {
          return RESPONSES.badRequest(
            'Missing "prefix", "start" and/or "end" properties in request body',
          );
        }

        const result = [];
        for await (const res of iterator) result.push(res);
        return Response.json(result);
      }
        // TODO: case 'sum': { }
        // TODO: case 'max': { }
        // TODO: case 'min': { }
    }

    return RESPONSES.badRequest(
      operation
        ? `Operation "${operation}" is not supported`
        : 'Missing "operation" property in request body',
    );
  });
  app.get("/datastore/[prefix]", async (ctx) => {
    const { prefix } = ctx.params;
    // supports MongoDB-like URL queries via dot-notation (powered by mingo)
    // e.g. GET /datastore/deals?contactIds.$in=["01HS1HVHBT0XKD8X6BYJ956NR6"]
    // flatQuery: { "contactIds.$in": '["01HS1HVHBT0XKD8X6BYJ956NR6"]' }
    // nestedQuery: { "contactIds.$in": '["01HS1HVHBT0XKD8X6BYJ956NR6"]' }
    // query: { contactIds: { "$in": [ "01HS1HVHBT0XKD8X6BYJ956NR6" ] } }
    const flatQuery = Object.fromEntries(ctx.url.searchParams);
    const nestedQuery = unflatten(flatQuery) as Record<string, unknown>;
    const query = deepParseJson(nestedQuery) as Record<string, unknown>;
    const result = await ds.find(prefix, query);
    return Response.json(result);
  });
  app.post("/datastore/[prefix]", async (ctx) => {
    const { prefix } = ctx.params;
    const data = await parseRequestBody(ctx.req);
    const result = await ds.create(prefix, data);
    return Response.json(result);
  });
  app.get("/datastore/[prefix]/[id]", async (ctx) => {
    const { prefix, id } = ctx.params;
    const result = await ds.get(prefix, id);
    return Response.json(result);
  });
  app.put("/datastore/[prefix]/[id]", async (ctx) => {
    const { prefix, id } = ctx.params;
    const data = await parseRequestBody(ctx.req);
    const result = await ds.update(prefix, id, data);
    return Response.json(result);
  });
  app.patch("/datastore/[prefix]/[id]", async (ctx) => {
    const { prefix, id } = ctx.params;
    const data = await parseRequestBody(ctx.req);
    const result = await ds.patch(prefix, id, data);
    return Response.json(result);
  });
  app.delete("/datastore/[prefix]/[id]", async (ctx) => {
    const { prefix, id } = ctx.params;
    const result = await ds.remove(prefix, id);
    return Response.json(result);
  });
};
