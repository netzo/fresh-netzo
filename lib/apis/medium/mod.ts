import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export interface MediumOptions {
  accessToken: string;
}

/**
 * SDK constructor function for the Medium API
 *
 * @see https://netzo.io/docs/netzo/apis/medium
 *
 * @param {string} accessToken - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const medium = ({
  accessToken = Deno.env.get("MEDIUM_ACCESS_TOKEN")!,
}: MediumOptions) => {
  const api = createApi({
    baseURL: `https://api.medium.com/v1`,
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: 'bearer',
        token: accessToken,
      }, ctx);
    },
  });

  return { api };
};
