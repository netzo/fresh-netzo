import type { Plugin, PluginRoute } from "../../deps/$fresh/server.ts";
import type { NetzoState } from "../mod.ts";
import type { Service } from "./types.ts";
import {
  type Methods,
  parseRequestBody,
  parseSearchParams,
  RESPONSES,
} from "./utils.ts";

export type ApiConfig = {
  /** Wether to require authentication using the provided API key
   * in the "x-api-key" header or "apiKey" query parameter.
   * IMPORTANT: set "apiKey" using Deno.env.get(...) to keep it secret  */
  apiKey?: string;
  /** The route path to mount the API on. Defaults to "/api". */
  path?: string;
  /** The field name to use as the primary key. Defaults to "id". */
  idField?: string;
  /** An object mapping service names to services instances. */
  services: Record<Methods[number], Service>;
};

export type ApiState = {
  [key: string]: Service;
};

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/api` route path.
 *
 * A fresh plugin that creates handlers for the following routes:
 * - `GET /api/{serviceName}` find all records matching query
 * - `GET /api/{serviceName}/{id}` get an entry by key
 * - `POST /api/{serviceName}` create a new entry (auto-generates id)
 * - `PUT /api/{serviceName}/{id}` update an entry by key
 * - `PATCH /api/{serviceName}/{id}` patch an entry by key
 * - `DELETE /api/{serviceName}/{id}` remove an entry by key
 */
export const api = (options?: ApiConfig): Plugin<NetzoState> => {
  if (!options) return { name: "api" };

  options.path ??= "/api";
  options.idField ??= "id";

  const { apiKey, path, idField, services } = options ?? {};

  const routes: Plugin["routes"] = [];
  Object.entries(services!).forEach(([servicePath, service]) => {
    routes.push(...[
      {
        path: `${path}/${servicePath}`,
        handler: {
          GET: service?.find
            ? async (_req, ctx) => {
              const { params, query } = parseSearchParams(ctx.url.searchParams);
              const prefix = [servicePath];
              const result = await service.find(query);
              // validate to against ctx.state.project.services.schemas (if any)
              // const validate = await service.assertValid(result, query);
              return Response.json(result);
            }
            : () => RESPONSES.notAllowed(),
          POST: service?.create
            ? async (req, ctx) => {
              const { params } = parseSearchParams(ctx.url.searchParams);
              const prefix = [servicePath];
              const data = await parseRequestBody(req);
              const result = await service.create(data, idField);
              return Response.json(result);
            }
            : () => RESPONSES.notAllowed(),
        },
      } satisfies PluginRoute,
      {
        path: `${path}/${servicePath}/[id]`,
        handler: {
          GET: service?.get
            ? async (_req, ctx) => {
              const { params, query } = parseSearchParams(ctx.url.searchParams);
              const result = await service.get(ctx.params.id);
              return Response.json(result);
            }
            : () => RESPONSES.notAllowed(),
          PUT: service?.update
            ? async (req, ctx) => {
              const { params } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await service.update(ctx.params.id, data);
              return Response.json(result);
            }
            : () => RESPONSES.notAllowed(),
          PATCH: service?.patch
            ? async (req, ctx) => {
              const { params } = parseSearchParams(ctx.url.searchParams);
              const data = await parseRequestBody(req);
              const result = await service.patch(ctx.params.id, data);
              return Response.json(result);
            }
            : () => RESPONSES.notAllowed(),
          DELETE: service?.remove
            ? async (_req, ctx) => {
              const { params } = parseSearchParams(ctx.url.searchParams);
              await service.remove(ctx.params.id);
              return Response.json({ key });
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
