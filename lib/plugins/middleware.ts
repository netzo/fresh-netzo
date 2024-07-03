import { MiddlewareHandler } from "fresh";
import { RESPONSES } from "./utils.ts";

const enableCors = (req: Request, res: Response) => {
  const origin = req.headers.get("Origin") || "*";
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Headers", "*");
  res.headers.set("Access-Control-Allow-Methods", "*");
};

export function cors(): MiddlewareHandler {
  return async (req, ctx) => {
    if (req.method == "OPTIONS") {
      const res = new Response(null, { status: 204 });
      enableCors(req, res);
      return res;
    }
    const res = await ctx.next();
    enableCors(req, res);
    return res;
  };
}

export function apiKeyAuthentication({ apiKey }: { apiKey: string }): MiddlewareHandler {
  return async (req, ctx) => {
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
