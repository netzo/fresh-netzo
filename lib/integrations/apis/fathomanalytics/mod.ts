import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export type FathomAnalyticsOptions = {
  apiKey: string;
};

/**
 * Factory function for the Fathom Analytics API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/fathomanalytics
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
 */
export const fathomanalytics = ({
  apiKey = Deno.env.get("FATHOMANALYTICS_API_KEY")!,
}: FathomAnalyticsOptions) => {
  const api = createApi({
    baseURL: "https://api.usefathom.com/v1",
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
