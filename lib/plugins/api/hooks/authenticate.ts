import { defineHook } from "./mod.ts";
import { NotAuthenticated } from "../errors.ts";

export type AuthenticateOptions = {
  /** The API key to use for authenticating requests (defaults to Deno.env.get("NETZO_API_KEY"))
   * IMPORTANT: set value using Deno.env.get(...) to keep it secret  */
  apiKey?: string;
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
    const { apiKey = Deno.env.get("NETZO_API_KEY")! } = options ?? {};

    if (!apiKey) return await next();

    const url = new URL(ctx.req.url);
    const origin = ctx.req.headers.get("origin")!; // e.g. https://my-project-906698.netzo.io
    const referer = ctx.req.headers.get("referer")!; // SOMETIMES SET e.g. https://app.netzo.io/some-path

    // skip if request is from same origin or referer (to allow fetch within app)
    const sameOrigin = !!origin && url.origin === origin;
    const sameReferer = !!referer && referer?.startsWith(url.origin);
    if (sameOrigin || sameReferer) return await next();

    // API key authentication
    const apiKeyHeader = ctx.req.headers.get("x-api-key");
    const apiKeySearchParams = url.searchParams.get("$apiKey");
    const apiKeyValue = apiKeyHeader || apiKeySearchParams;
    if (!apiKeyValue) throw new NotAuthenticated("Missing API key");
    if (apiKeyValue !== apiKey) throw new NotAuthenticated("Invalid API key");

    await next();
  });
};
