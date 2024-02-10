import type { Plugin, PluginRoute } from "../../deps/$fresh/server.ts";
import type { Resource } from "./resources/mod.ts";
import {
  type Methods,
  parseRequestBody,
  parseSearchParams,
  RESPONSES,
} from "./utils.ts";

export type ApiConfig = {
  /** Whether to require authentication using the provided API key
   * in the "x-api-key" header or "apiKey" query parameter.
   * IMPORTANT: set "apiKey" using Deno.env.get(...) to keep it secret  */
  apiKey?: string;
  /** The route path to mount the API on. Defaults to "/api". */
  path?: string;
  /** The field name to use as the primary key. Defaults to "id". */
  idField?: string;
  /** An object mapping resource names to resources instances. */
  resources: Record<Methods[number], Resource>;
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

  options.path ??= "/api";
  options.idField ??= "id";

  const { apiKey, path, idField, resources } = options ?? {};

  const routes: Plugin["routes"] = [];
  Object.entries(resources!).forEach(([resourceName, resource]) => {
    routes.push(...[
      {
        path: `${path}/${resourceName}`,
        handler: {
          GET: resource?.find
            ? async (_req, ctx) => {
              const { params, query } = parseSearchParams(ctx.url.searchParams);
              const result = await resource.find(query);
              return Response.json(result);
            }
            : () => RESPONSES.notAllowed(),
          POST: resource?.create
            ? async (req, ctx) => {
              const { params } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await resource.create(data, idField);
              return Response.json(result);
            }
            : () => RESPONSES.notAllowed(),
        },
      } satisfies PluginRoute,
      {
        path: `${path}/${resourceName}/[id]`,
        handler: {
          GET: resource?.get
            ? async (_req, ctx) => {
              const { params, query } = parseSearchParams(ctx.url.searchParams);
              const result = await resource.get(ctx.params.id);
              return Response.json(result);
            }
            : () => RESPONSES.notAllowed(),
          PUT: resource?.update
            ? async (req, ctx) => {
              const { params } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await resource.update(ctx.params.id, data);
              return Response.json(result);
            }
            : () => RESPONSES.notAllowed(),
          PATCH: resource?.patch
            ? async (req, ctx) => {
              const { params } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await resource.patch(ctx.params.id, data);
              return Response.json(result);
            }
            : () => RESPONSES.notAllowed(),
          DELETE: resource?.remove
            ? async (_req, ctx) => {
              const { params } = parseSearchParams(ctx.url.searchParams);
              const result = await resource.remove(ctx.params.id);
              return Response.json(result);
            }
            : () => RESPONSES.notAllowed(),
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
