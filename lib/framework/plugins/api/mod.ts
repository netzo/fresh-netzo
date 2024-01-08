import type { Plugin } from "../../../deps/$fresh/server.ts";
import { isHttpError } from "../../../deps/std/http/http_errors.ts";
import type { NetzoConfig } from "../../../framework/mod.ts";
import { parseRequestBody } from "../../../framework/utils/mod.ts";
import { createDatabase } from "../../../core/database.ts";
import { ERRORS, METHODS, parseSearchParams } from "./utils.ts";

const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

const db = createDatabase(kv);

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/api` route path.
 *
 * A fresh plugin that creates handlers for the following routes:
 * - `GET /api?$prefix=<PREFIX>` find all records matching query
 * - `GET /api?$key=<KEY>` get an entry by key
 * - `POST /api?$prefix=<PREFIX>` create a new entry (auto-generates id)
 * - `PUT /api?$key=<KEY>` update an entry by key
 * - `PATCH /api?$key=<KEY>` patch an entry by key
 * - `DELETE /api?$key=<KEY>` remove an entry by key
 */
export const api = (options?: NetzoConfig["api"]): Plugin => {
  const {
    auth,
    path = "/api",
    idField = "id",
    methods = METHODS,
  } = options ?? {};
  return {
    name: "api",
    middlewares: [
      {
        path,
        middleware: {
          handler: async (req, ctx) => {
            try {
              if (!["route"].includes(ctx.destination)) return await ctx.next();
              if (auth !== true) return await ctx.next();

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
              const apiKey = apiKeyHeader || apiKeySearchParams;
              if (!apiKey) return ERRORS.missingApiKey();
              if (apiKey !== Deno.env.get("NETZO_API_KEY")!) {
                return ERRORS.invalidApiKey();
              }
              ctx.url.searchParams.delete("apiKey"); // remove apiKey from query

              return await ctx.next();
            } catch (error) {
              return toErrorResponse(error);
            }
          },
        },
      },
    ],
    routes: [
      {
        path,
        handler: {
          async GET(_req, ctx) {
            const { params, query } = parseSearchParams(ctx.url.searchParams);
            if (params.$prefix) {
              if (!methods!.includes("find")) return ERRORS.notAllowed();
              const prefix = params.$prefix.split(",");
              const result = await db.find(prefix, query);
              // validate to against ctx.state.project.database.schemas (if any)
              // const validate = await db.assertValid(result, query);
              return Response.json(result);
            } else if (params.$prefix) {
              if (!methods!.includes("get")) return ERRORS.notAllowed();
              const key = params.$key.split(",");
              const result = await db.get(key);
              return Response.json(result);
            } else {
              return ERRORS.invalidRequest();
            }
          },
          async POST(req, ctx) {
            const { params } = parseSearchParams(ctx.url.searchParams);
            if (!methods!.includes("create")) return ERRORS.notAllowed();
            const prefix = params.$prefix.split(",");
            const data = await parseRequestBody(req);
            const result = await db.create(prefix, data, idField);
            return Response.json(result);
          },
          async PUT(req, ctx) {
            const { params } = parseSearchParams(ctx.url.searchParams);
            if (!methods!.includes("update")) return ERRORS.notAllowed();
            const key = params.$key.split(",");
            const data = await parseRequestBody(req);
            const result = await db.update(key, data);
            return Response.json(result);
          },
          async PATCH(req, ctx) {
            const { params } = parseSearchParams(ctx.url.searchParams);
            if (!methods!.includes("patch")) return ERRORS.notAllowed();
            const key = params.$key.split(",");
            const data = await parseRequestBody(req);
            const result = await db.patch(key, data);
            return Response.json(result);
          },
          async DELETE(req, ctx) {
            const { params } = parseSearchParams(ctx.url.searchParams);
            if (!methods!.includes("remove")) return ERRORS.notAllowed();
            const key = params.$key.split(",");
            await db.remove(key);
            return Response.json({ id });
          },
        },
      },
    ],
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
 * @see {@link https://deno.land/std/http/http_errors.ts}
 *
 * @example
 * ```ts
 * import { toErrorResponse } from "@/plugins/error_handling.ts";
 * import { errors } from "../../../deps/std/http/http_errors.ts";
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
  return isHttpError(error)
    ? new Response(error.message, {
      status: error.status,
      headers: error.headers,
    })
    : new Response(error.message, { status: 500 });
}
