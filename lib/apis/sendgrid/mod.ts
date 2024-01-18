import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export type SendgridOptions = {
  apiKey: string;
};

/**
 * SDK constructor function for the Sendgrid API
 *
 * @see https://netzo.io/docs/framework/apis/sendgrid
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const sendgrid = ({
  apiKey = Deno.env.get("SENDGRID_API_KEY")!,
}: SendgridOptions) => {
  const api = createApi({
    baseURL: "https://api.sendgrid.com/v3",
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: apiKey,
      }, ctx);
    },
  });

  return api;
};
