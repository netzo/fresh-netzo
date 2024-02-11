import type { Plugin, PluginRoute } from "../../deps/$fresh/server.ts";
import { hooks as _hooks } from "../../deps/@feathersjs/hooks.ts";
import type { Resource } from "./resources/mod.ts";
import {
  type Methods,
  parseRequestBody,
  parseSearchParams,
  RESPONSES,
} from "./utils.ts";

export type ApiEndpoint = {
  /** The field name to use as the primary key. Defaults to "id". */
  idField?: string;
  /** The resource instance to use for performing RESTful operations. */
  resource: Resource;
  /** An object mapping resource names an array of hooks to apply to the resource. */
  hooks?: Record<Methods[number], any>;
};

export const defineAPIEndpoint = (options: ApiEndpoint): ApiEndpoint => options;

export type ApiConfig = {
  /** The route path to mount the API on. Defaults to "/api". */
  path?: string;
  /** An object mapping resource names to resources instances. */
  endpoints: Record<Methods[number], ApiEndpoint>;
};

export type ApiState = {
  [key: string]: Resource;
};

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/api` route path.
 *
 * A fresh plugin that creates handlers for the following routes:
 * - `GET /api/{resourceName}` find all records matching query
 * - `GET /api/{resourceName}/{id}` get an entry by key
 * - `POST /api/{resourceName}` create a new entry (auto-generates id)
 * - `PUT /api/{resourceName}/{id}` update an entry by key
 * - `PATCH /api/{resourceName}/{id}` patch an entry by key
 * - `DELETE /api/{resourceName}/{id}` remove an entry by key
 */
export const api = (options?: ApiConfig): Plugin => {
  if (!options) return { name: "api" };

  const { path = "/api", endpoints = {} } = options ?? {};

  const routes: Plugin["routes"] = [];
  Object.entries(endpoints!).forEach(([resourceName, resourceOptions]) => {
    const { idField, resource, hooks = {} } = resourceOptions ?? {};
    routes.push(...[
      {
        path: `${path}/${resourceName}`,
        handler: {
          GET: resource?.find
            ? async (_req, ctx) => {
              const find = _hooks(resource.find, hooks.find);
              const { params: _, query } = parseSearchParams(
                ctx.url.searchParams,
              );
              const result = await find(query);
              return Response.json(result);
            }
            : () => RESPONSES.notImplemented(),
          POST: resource?.create
            ? async (req, ctx) => {
              const create = _hooks(resource.create, hooks.create);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await create(data);
              return Response.json(result);
            }
            : () => RESPONSES.notImplemented(),
        },
      } satisfies PluginRoute,
      {
        path: `${path}/${resourceName}/[id]`,
        handler: {
          GET: resource?.get
            ? async (_req, ctx) => {
              const get = _hooks(resource.get, hooks.get);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const result = await get(ctx.params.id);
              return Response.json(result);
            }
            : () => RESPONSES.notImplemented(),
          PUT: resource?.update
            ? async (req, ctx) => {
              const update = _hooks(resource.update, hooks.update);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await update(ctx.params.id, data);
              return Response.json(result);
            }
            : () => RESPONSES.notImplemented(),
          PATCH: resource?.patch
            ? async (req, ctx) => {
              const patch = _hooks(resource.patch, hooks.patch);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await patch(ctx.params.id, data);
              return Response.json(result);
            }
            : () => RESPONSES.notImplemented(),
          DELETE: resource?.remove
            ? async (_req, ctx) => {
              const remove = _hooks(resource.remove, hooks.remove);
              const { params: _ } = parseSearchParams(ctx.url.searchParams);
              const result = await remove(ctx.params.id);
              return Response.json(result);
            }
            : () => RESPONSES.notImplemented(),
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
          handler: async (req, ctx) => {
            try {
              if (!["route"].includes(ctx.destination)) return await ctx.next();
              if (!apiKey) return await ctx.next();

              const origin = req.headers.get("origin")!; // e.g. https://my-project-906698.netzo.io
              const referer = req.headers.get("referer")!; // SOMETIMES SET e.g. https://app.netzo.io/some-path

              // skip if request is from same origin or referer (to allow fetch within app)
              const sameOrigin = origin && ctx.url.origin === origin;
              const sameReferer = referer &&
                referer?.startsWith(ctx.url.origin);
              if (sameOrigin || sameReferer) {
                return await ctx.next();
              }

              // API key authentication
              const apiKeyHeader = req.headers.get("x-api-key");
              const apiKeySearchParams = ctx.url.searchParams.get("apiKey");
              const apiKeyValue = apiKeyHeader || apiKeySearchParams;
              if (!apiKeyValue) return RESPONSES.missingApiKey();
              if (apiKeyValue !== apiKey) return RESPONSES.invalidApiKey();
              ctx.url.searchParams.delete("apiKey"); // remove apiKey from query

              return await ctx.next();
            } catch (error) {
              return toErrorResponse(error);
            }
          },
        },
      },
    ],
    routes,
  };
};

/**
 * Returns the converted HTTP error response from the given error. If the error
 * is an instance of {@linkcode Deno.errors.NotFound}, a HTTP 404 Not Found
 * error response is returned. This is done to translate errors thrown from
 * logic that's separated by concerns.
 *
 * If the error is a HTTP-flavored error, the corresponding HTTP error response
 * is returned.
 *
 * If the error is a generic error, a HTTP 500 Internal Server error response
 * is returned.
 *
 * @see {@link https://deno.land/std/http/status.ts}
 *
 * @example
 * ```ts
 * import { toErrorResponse } from "@/plugins/error_handling.ts";
 * import { errors } from "../deps/std/http/status.ts";
 *
 * const resp = toErrorResponse(new errors.NotFound("User not found"));
 * resp.status; // Returns 404
 * await resp.text(); // Returns "User not found"
 * ```
 */
// deno-lint-ignore no-explicit-any
export function toErrorResponse(error: any) {
  if (error instanceof Deno.errors.NotFound) {
    return new Response(error.message, { status: 404 });
  }
  return new Response(error.message); // TODO: use custom HttpError class to retain status code
}
