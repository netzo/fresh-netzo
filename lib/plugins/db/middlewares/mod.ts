import { MiddlewareHandler } from "$fresh/server.ts";
import type { DbConfig } from "../plugin.ts";
import { RESPONSES } from "../utils.ts";

export function apiKeyAuthentication(config: DbConfig): MiddlewareHandler {
  return async (req, ctx) => {
    const { apiKey } = config;
    try {
      if (!["route"].includes(ctx.destination)) return await ctx.next();
      if (!apiKey) return await ctx.next();

      const origin = req.headers.get("origin")!; // e.g. https://my-project-906698.netzo.io
      const referer = req.headers.get("referer")!; // SOMETIMES SET e.g. https://app.netzo.io/some-path

      // skip if request is from same origin or referer (to allow fetch within app)
      const sameOrigin = origin && ctx.url.origin === origin;
      const sameReferer = referer && referer?.startsWith(ctx.url.origin);
      if (sameOrigin || sameReferer) return await ctx.next();

      // API key authentication
      const apiKeyHeader = req.headers.get("x-api-key");
      const apiKeySearchParams = ctx.url.searchParams.get("apiKey");
      const apiKeyValue = apiKeyHeader || apiKeySearchParams;
      if (!apiKeyValue) return RESPONSES.missingApiKey();
      if (apiKeyValue !== apiKey) return RESPONSES.invalidApiKey();
      ctx.url.searchParams.delete("apiKey"); // remove apiKey from query

      return await ctx.next();
    } catch (error) {
      const { message, status = 500, headers } = error;
      return new Response(message, { status, headers });
    }
  };
}
