import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

/**
 * SDK constructor function for the Shopify Admin API
 *
 * @see https://netzo.io/docs/netzo/apis/shopifyadmin
 *
 * @param {string} storeName - the store name to construct the base URL
 * @param {string} apiKey - the API key to use for authentication
 * @param {string} apiVersion - the version to use for the base URL
 * @returns {object} - an object of multiple utilities for the API
 */
export const shopifyadmin = ({
  storeName = Deno.env.get("SHOPIFYADMIN_STORE_NAME"),
  apiKey = Deno.env.get("SHOPIFYADMIN_API_KEY")!,
  apiVersion = Deno.env.get("SHOPIFYADMIN_API_VERSION")!,
}) => {
  const api = createApi({
    baseURL: `https://${storeName}.myshopify.com/admin/api/${apiVersion}`,
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "X-Shopify-Access-Token",
        value: apiKey,
      }, ctx);
    },
  });

  return { api };
};
