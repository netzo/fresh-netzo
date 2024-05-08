import { auth } from "./create-api/auth/mod.ts";
import { createApi } from "./create-api/mod.ts";

export type SendgridOptions = {
  apiKey: string;
};

/**
 * Factory function for the Sendgrid API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/sendgrid
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
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
