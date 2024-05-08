import { auth } from "./create-api/auth/mod.ts";
import { createApi } from "./create-api/mod.ts";

export type IpGeolocationOptions = {
  apiKey: string;
};

/**
 * Factory function for the Ip Geolocation API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/ipgeolocation
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
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
