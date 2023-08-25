import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export interface WixOptions {
  accountId: string;
  siteId: string;
  apiKey: string;
}

/**
 * SDK constructor function for the Wix API
 *
 * @see https://netzo.io/docs/netzo/apis/wix
 *
 * @param {string} accountId - the account id to construct the request headers
 * @param {string} siteId - the site id to construct the request headers
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
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
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Authorization",
        value: apiKey,
      }, ctx);
    },
  });

  return { api };
};
