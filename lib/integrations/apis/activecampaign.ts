import { auth } from "../create-api/auth/mod.ts";
import { createApi } from "../create-api/mod.ts";

export type ActiveCampaignOptions = {
  accountName: string;
  apiKey: string;
};

/**
 * Factory function for the ActiveCampaign API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/activecampaign
 *
 * @param {string} accountName - the account name to construct the base URL
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
 */
export const activecampaign = ({
  accountName = Deno.env.get("ACTIVECAMPAIGN_ACCOUNT_NAME")!,
  apiKey = Deno.env.get("ACTIVECAMPAIGN_API_KEY")!,
}: ActiveCampaignOptions) => {
  const api = createApi({
    baseURL: `https://${accountName}.api-us1.com/api/3`,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Api-Token",
        value: apiKey,
      }, ctx);
    },
  });

  return api;
};
