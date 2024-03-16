import type { PluginMiddleware } from "../../../deps/$fresh/server.ts";
import { join } from "../../../deps/std/path/mod.ts";
import { createDatabase } from "../database.ts";
import type { DatabaseCollection, DatabaseConfig } from "../plugin.ts";
import { ERRORS } from "../utils.ts";

export const getMiddlewaresByCollection = (
  collection: DatabaseCollection,
  options: DatabaseConfig,
): PluginMiddleware[] => {
  const { kv, name, apiKey = Deno.env.get("NETZO_API_KEY") } = { ...options, ...collection };

  const db = createDatabase(kv);

  const middlewares: PluginMiddleware[] = [
    {
      path: join(options.path!, name),
      middleware: { handler: apiKeyAuthentication },
    },
  ];

  return middlewares;
};

async function apiKeyAuthentication(req, ctx) {
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
    if (!apiKeyValue) return ERRORS.missingApiKey();
    if (apiKeyValue !== apiKey) return ERRORS.invalidApiKey();
    ctx.url.searchParams.delete("apiKey"); // remove apiKey from query

    return await ctx.next();
  } catch (error) {
    const { message, status = 500, headers } = error;
    return new Response(message, { status, headers });
  }
}