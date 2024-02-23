import { auth } from "../create-api/auth/mod.ts";
import { createApi } from "../create-api/mod.ts";

export type WixOptions = {
  accountId: string;
  siteId: string;
  apiKey: string;
};

/**
 * Factory function for the Wix API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/wix
 *
 * @param {string} accountId - the account id to construct the request headers
 * @param {string} siteId - the site id to construct the request headers
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
 */
export const wix = ({
  accountId = Deno.env.get("WIX_ACCOUNT_ID")!,
  siteId = Deno.env.get("WIX_SITE_ID")!,
  apiKey = Deno.env.get("WIX_API_KEY")!,
}: WixOptions) => {
  const api = createApi({
    baseURL: `https://www.wixapis.com`,
    headers: {
      "content-type": "application/json",
      "wix-account-id": accountId,
      "wix-site-id": siteId,
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Authorization",
        value: apiKey,
      }, ctx);
    },
  });

  return api;
};
