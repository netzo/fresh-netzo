import { auth } from "../../create-api/auth/mod.ts";
import { createApi } from "../../create-api/mod.ts";

export type PipeDriveOptions = {
  apiToken: string;
  companyDomain: string;
};

/**
 * Factory function for the Pipedrive API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/pipedrive
 *
 * @param {string} apiToken - the token to use for authentication
 * @param {string} companyDomain - the company domain to use for authentication
 * @returns {object} - an API client instance
 */
export const pipedrive = ({
  apiToken = Deno.env.get("PIPEDRIVE_API_TOKEN")!,
  companyDomain = Deno.env.get("PIPEDRIVE_COMPANY_DOMAIN")!,
}: PipeDriveOptions) => {
  const api = createApi({
    baseURL: `https://${companyDomain}.pipedrive.com/v1`,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "query",
        name: "api_token",
        value: apiToken,
      }, ctx);
    },
  });

  return api;
};
