import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export type HubspotOptions = {
  privateAppAccessToken: string;
};

/**
 * SDK constructor function for the Hubspot API
 *
 * @see https://netzo.io/docs/platform/apis/hubspot
 *
 * @param {string} privateAppAccessToken - the token to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const hubspot = ({
  privateAppAccessToken = Deno.env.get("HUBSPOT_PRIVATE_APP_ACCESS_TOKEN")!,
}: HubspotOptions) => {
  const api = createApi({
    baseURL: "https://api.hubapi.com",
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: privateAppAccessToken,
      }, ctx);
    },
  });

  return api;
};
