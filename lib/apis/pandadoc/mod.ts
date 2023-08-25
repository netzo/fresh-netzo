import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export interface PandaDocOptions {
  apiKey: string;
}

/**
 * SDK constructor function for the PandaDoc API
 *
 * @see https://netzo.io/docs/netzo/apis/pandadoc
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const pandadoc = ({
  apiKey = Deno.env.get("PANDADOC_API_KEY")!,
}: PandaDocOptions) => {
  const api = createApi({
    baseURL: "https://api.pandadoc.com/public/v1",
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Authorization",
        value: `API-Key ${apiKey}`,
      }, ctx);
    },
  });

  return { api };
};
