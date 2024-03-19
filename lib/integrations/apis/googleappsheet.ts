import { auth } from "./create-api/auth/mod.ts";
import { createApi } from "./create-api/mod.ts";

export type GoogleappsheetOptions = {
  appId: string;
  applicationAccessKey: string;
};

/**
 * Factory function for the Google Appsheet API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/googleappsheet
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
 */
export const googleappsheet = ({
  appId = Deno.env.get("GOOGLEAPPSHEET_APP_ID")!,
  applicationAccessKey = Deno.env.get("GOOGLEAPPSHEET_APPLICATION_ACCESS_KEY")!,
}: GoogleappsheetOptions) => {
  const api = createApi({
    baseURL: `https://api.appsheet.com/api/v2/apps/${appId}/tables`,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "ApplicationAccessKey",
        value: applicationAccessKey,
      }, ctx);
    },
  });

  return api;
};
