import { HookContext, NextFunction } from "../../../deps/@feathersjs/hooks.ts";
import { RESPONSES } from "../utils.ts";

export type AuthenticateOptions = {
  /** The API key to use for authenticating requests.
   * IMPORTANT: set "apiKey" using Deno.env.get(...) to keep it secret  */
  apiKey?: string;
};

/**
 * A hook that authenticates requests using the provided API key
 * by checking the "x-api-key" header or "apiKey" query parameter.
 *
 * @param options {AuthenticateOptions} - options object (defaults to Deno.env.get("NETZO_API_KEY"))
 * @returns a hook function
 */
export const authenticate = (options: AuthenticateOptions) => {
  return async (ctx: HookContext, next: NextFunction) => {
    console.log(ctx);
    const { apiKey = Deno.env.get("NETZO_API_KEY")! } = options;
    const apiKeyHeader = ctx.req.headers.get("x-api-key");
    const apiKeySearchParams = ctx.url.searchParams.get("apiKey");
    const apiKeyValue = apiKeyHeader || apiKeySearchParams;
    if (!apiKeyValue) return RESPONSES.missingApiKey();
    if (apiKeyValue !== apiKey) return RESPONSES.invalidApiKey();
    ctx.url.searchParams.delete("apiKey"); // remove apiKey from query

    await next();
  };
};
