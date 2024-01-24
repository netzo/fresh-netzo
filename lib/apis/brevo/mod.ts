import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export type BrevoOptions = {
  apiKey: string;
};

/**
 * SDK constructor function for the Brevo API
 *
 * @see https://netzo.io/docs/modules/apis/brevo
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const brevo = ({
  apiKey = Deno.env.get("BREVO_API_KEY")!,
}: BrevoOptions) => {
  const api = createApi({
    baseURL: "https://api.brevo.com/v3",
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "api-key",
        value: apiKey,
      }, ctx);
    },
  });

  return api;
};
