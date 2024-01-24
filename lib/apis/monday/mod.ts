import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export type MondayOptions = {
  apiKey: string;
};

/**
 * SDK constructor function for the Monday API
 *
 * @see https://netzo.io/docs/modules/apis/monday
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const monday = ({
  apiKey = Deno.env.get("MONDAY_API_KEY")!,
}: MondayOptions) => {
  const api = createApi({
    baseURL: "https://api.monday.com/v2",
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Authorization",
        value: apiKey,
      }, ctx);
    },
  });

  return api;
};
