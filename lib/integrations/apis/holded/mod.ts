import { auth } from "../../create-api/auth/mod.ts";
import { createApi } from "../../create-api/mod.ts";

export type HoldedOptions = {
  apiKey: string;
};

/**
 * Factory function for the Holded API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/holded
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
 */
export const holded = ({
  apiKey = Deno.env.get("HOLDED_API_KEY")!,
}: HoldedOptions) => {
  const api = createApi({
    baseURL: "https://api.holded.com/api",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "key",
        value: apiKey,
      }, ctx);
    },
  });

  return api;
};
