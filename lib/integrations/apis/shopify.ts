import { auth } from "../create-api/auth/mod.ts";
import { createApi } from "../create-api/mod.ts";

export type ShopifyOptions = {
  storeName: string;
  apiVersion: string;
  apiKey: string;
};

/**
 * Factory function for the Shopify Admin API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/shopify
 *
 * @param {string} storeName - the store name to construct the base URL
 * @param {string} apiVersion - the version to use for the base URL
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
 */
export const shopify = ({
  storeName = Deno.env.get("SHOPIFY_STORE_NAME")!,
  apiVersion = Deno.env.get("SHOPIFY_API_VERSION")!,
  apiKey = Deno.env.get("SHOPIFY_API_KEY")!,
}: ShopifyOptions) => {
  const api = createApi({
    baseURL: `https://${storeName}.myshopify.com/admin/api/${apiVersion}`,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "X-Shopify-Access-Token",
        value: apiKey,
      }, ctx);
    },
  });

  return api;
};
