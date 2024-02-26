import { auth } from "../create-api/auth/mod.ts";
import { createApi } from "../create-api/mod.ts";

export type AirtableOptions = {
  personalAccessToken: string;
};

/**
 * Factory function for the Airtable API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/airtable
 *
 * @param {string} personalAccessToken - the token to use for authentication
 * @returns {object} - an API client instance
 */
export const airtable = ({
  personalAccessToken = Deno.env.get("AIRTABLE_PERSONAL_ACCESS_TOKEN")!,
}: AirtableOptions) => {
  const api = createApi({
    baseURL: `https://api.airtable.com/v0`,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: personalAccessToken,
      }, ctx);
    },
  });

  return api;
};
