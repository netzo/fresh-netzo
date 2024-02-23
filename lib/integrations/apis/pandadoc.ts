import { auth } from "../create-api/auth/mod.ts";
import { createApi } from "../create-api/mod.ts";

export type PandaDocOptions = {
  apiKey: string;
};

/**
 * Factory function for the PandaDoc API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/pandadoc
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
 */
export const pandadoc = ({
  apiKey = Deno.env.get("PANDADOC_API_KEY")!,
}: PandaDocOptions) => {
  const api = createApi({
    baseURL: "https://api.pandadoc.com/public/v1",
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Authorization",
        value: `API-Key ${apiKey}`,
      }, ctx);
    },
  });

  return api;
};
