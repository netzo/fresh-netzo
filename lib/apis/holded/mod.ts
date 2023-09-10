import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export interface HoldedOptions {
  apiKey: string;
}

/**
 * SDK constructor function for the Holded API
 *
 * @see https://netzo.io/docs/netzo/apis/holded
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const holded = ({
  apiKey = Deno.env.get("HOLDED_API_KEY")!,
}: HoldedOptions) => {
  const api = createApi({
    baseURL: "https://api.holded.com/api",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "key",
        value: apiKey,
      }, ctx);
    },
  });

  return { api };
};
