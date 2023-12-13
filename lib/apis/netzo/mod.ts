import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export type NetzoOptions = {
  apiKey: string;
  baseURL?: string;
};

/**
 * SDK constructor function for the Netzo API
 *
 * @see https://netzo.io/docs/framework/apis/netzo
 *
 * @param {string} apiKey - the API key to use for authentication
 * @param {string} baseURL - (internal) the base URL to use for the API
 * @returns {object} - an object of multiple utilities for the API
 */
export const netzo = ({
  apiKey = Deno.env.get("NETZO_API_KEY")!,
  baseURL = Deno.env.get("NETZO_API_URL") || "https://api.netzo.io",
}: NetzoOptions) => {
  const api = createApi({
    baseURL,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        // heuristic to determine if apiKey (64) or envVarApiKey (128)
        name: apiKey.length === 64 ? "x-api-key" : "x-env-var-api-key",
        value: apiKey,
      }, ctx);
    },
  });

  return { api };
};
