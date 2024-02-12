import { defineHook } from "./mod.ts";
import { NotAuthenticated } from "../errors.ts";

export type AuthenticateOptions = {
  /** The API key to use for authenticating requests
   * (defaults to Deno.env.get("NETZO_API_KEY")) */
  apiKey?: string;
  /** The header name to check for the API key (defaults to "x-api-key")
   * Set to false to disable authentication via request header. */
  header?: string | false;
  /** The query parameter name to check for the API key (defaults to "$apiKey").
   * Note that this MUST start with "$" to avoid being used as query parameter.
   * Set to false to disable authentication via request query parameter. */
  param?: `$${string}` | false;
};

/**
 * A hook that authenticates requests using the provided API key
 * by checking the "x-api-key" header or "$apiKey" query parameter.
 *
 * @param options {AuthenticateOptions} - options object (defaults to Deno.env.get("NETZO_API_KEY"))
 * @returns a hook function
 */
export const authenticate = (options?: AuthenticateOptions) => {
  return defineHook(async (ctx, next) => {
    const {
      apiKey = Deno.env.get("NETZO_API_KEY")!,
      header = "x-api-key",
      param = "$apiKey",
    } = options ?? {};

    if (!apiKey) return await next();

    const url = new URL(ctx.req.url);
    const origin = ctx.req.headers.get("origin")!; // e.g. https://my-project-906698.netzo.io
    const referer = ctx.req.headers.get("referer")!; // SOMETIMES SET e.g. https://app.netzo.io/some-path

    // skip if request is from same origin or referer (to allow fetch within app)
    const sameOrigin = !!origin && url.origin === origin;
    const sameReferer = !!referer && referer?.startsWith(url.origin);
    if (sameOrigin || sameReferer) return await next();

    // API key authentication
    const apiKeyHeader = header && ctx.req.headers.get(header);
    const apiKeySearchParams = param && url.searchParams.get(param);
    const apiKeyValue = apiKeyHeader || apiKeySearchParams;
    if (!apiKeyValue) throw new NotAuthenticated("Missing API key");
    if (apiKeyValue !== apiKey) throw new NotAuthenticated("Invalid API key");

    await next();
  });
};
