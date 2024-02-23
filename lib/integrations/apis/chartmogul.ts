import { auth } from "../create-api/auth/mod.ts";
import { createApi } from "../create-api/mod.ts";

export type ChartmogulOptions = {
  apiKey: string;
};

/**
 * Factory function for the ChartMogul API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/chartmogul
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
 */
export const chartmogul = ({
  apiKey = Deno.env.get("CHARTMOGUL_API_KEY")!,
}: ChartmogulOptions) => {
  const api = createApi({
    baseURL: "https://api.chartmogul.com/v1",
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "basic",
        value: apiKey,
      }, ctx);
    },
  });

  return api;
};
