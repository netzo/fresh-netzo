import { auth } from "./create-api/auth/mod.ts";
import { createApi } from "./create-api/mod.ts";

export type CloudflareOptions = {
  apiKey: string;
};

/**
 * Factory function for the Cloudflare API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/cloudflare
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
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
