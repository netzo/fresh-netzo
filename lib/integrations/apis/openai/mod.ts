import { createApi } from "../../create-api/mod.ts";
import { auth } from "../../create-api/auth/mod.ts";

export type OpenAIOptions = {
  apiKey: string;
};

/**
 * Factory function for the OpenAI API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/openai
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
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
