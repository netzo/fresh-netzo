import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export type IpGeolocationOptions = {
  apiKey: string;
};

/**
 * SDK constructor function for the Ip Geolocation API
 *
 * @see https://netzo.io/docs/framework/apis/ipgeolocation
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const ipgeolocation = ({
  apiKey = Deno.env.get("IPGEOLOCATION_API_KEY")!,
}: IpGeolocationOptions) => {
  const api = createApi({
    baseURL: `https://api.ipgeolocation.io/`,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "query",
        name: "apiKey",
        value: apiKey,
      }, ctx);
    },
  });

  return api;
};
