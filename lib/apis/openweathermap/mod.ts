import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export interface OpenWeatherMapOptions {
  apiKey: string;
}

/**
 * SDK constructor function for the Openweathermap API
 *
 * @see https://netzo.io/docs/netzo/apis/openweathermap
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const openweathermap = ({
  apiKey = Deno.env.get("OPENWEATHERMAP_API_KEY")!,
}: OpenWeatherMapOptions) => {
  const api = createApi({
    baseURL: `https://api.openweathermap.org/data/3.0`,
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "query",
        name: "appid",
        value: apiKey,
      }, ctx);
    },
  });

  return { api };
};
