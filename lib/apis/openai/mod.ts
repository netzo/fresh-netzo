import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

/**
 * SDK constructor function for the OpenAI API
 *
 * @see https://netzo.io/docs/netzo/apis/openai
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const openai = ({
  apiKey = Deno.env.get("OPENAI_API_KEY")!,
}) => {
  const api = createApi({
    baseURL: "https://api.openai.com/v1",
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Authorization",
        value: apiKey,
      }, ctx);
    },
  });

  return { api };
};
