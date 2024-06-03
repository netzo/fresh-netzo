import { auth } from "./create-api/auth/mod.ts";
import { createApi } from "./create-api/mod.ts";

export type MongoDbAtlasDataOptions = {
  dataApiAppId: string;
  apiKey: string;
};

/**
 * Factory function for the Mongodb Atlas Data API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/mongodbatlasdata
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
 */
export const mongodbatlasdata = ({
  dataApiAppId = Deno.env.get("MONGODBATLASDATA_DATA_API_APP_ID")!,
  apiKey = Deno.env.get("MONGODBATLASDATA_API_KEY")!,
}: MongoDbAtlasDataOptions) => {
  const api = createApi({
    baseURL: `https://data.mongodb-api.com/app/${dataApiAppId}/endpoint/data/v1`,
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
