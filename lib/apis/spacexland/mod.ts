import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export interface SpaceXLandOptions {
  apiKey: string;
}

/**
 * SDK constructor function for the SpaceX Land API
 *
 * @see https://netzo.io/docs/netzo/apis/spacexland
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const spacexland = ({
  apiKey = Deno.env.get("SPACEXLAND_API_KEY")!,
}: SpaceXLandOptions) => {
  const api = createApi({
    baseURL: "https://api.spacexland.com/v2",
    headers: {
      "content-type": "application/json",
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
