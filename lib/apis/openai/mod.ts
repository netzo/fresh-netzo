import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export type OpenAIOptions = {
  apiKey: string;
};

/**
 * SDK constructor function for the OpenAI API
 *
 * @see https://netzo.io/docs/platform/apis/openai
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const openai = ({
  apiKey = Deno.env.get("OPENAI_API_KEY")!,
}: OpenAIOptions) => {
  const api = createApi({
    baseURL: "https://api.openai.com/v1",
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
