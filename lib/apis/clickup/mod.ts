import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

/**
 * SDK constructor function for the Clickup API
 *
 * @see https://netzo.io/docs/netzo/apis/clickup
 *
 * @param {string} personalAccessToken - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const clickup = ({
  personalAccessToken = Deno.env.get("CLICKUP_PERSONAL_API_KEY")!,
}) => {
  const api = createApi({
    baseURL: `https://api.clickup.com/api/v2`,
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Authorization",
        value: personalAccessToken,
      }, ctx);
    },
  });

  return { api };
};
