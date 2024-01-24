import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export type CloudflareOptions = {
  apiKey: string;
};

/**
 * SDK constructor function for the Cloudflare API
 *
 * @see https://netzo.io/docs/modules/apis/cloudflare
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const cloudflare = ({
  apiKey = Deno.env.get("CLOUDFLARE_API_KEY")!,
}: CloudflareOptions) => {
  const api = createApi({
    baseURL: "https://api.cloudflare.com/client/v4",
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Authorization",
        value: `Bearer ${apiKey}`,
      }, ctx);
    },
  });

  return api;
};
