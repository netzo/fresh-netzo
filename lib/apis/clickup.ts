import { auth } from "./create-api/auth/mod.ts";
import { createApi } from "./create-api/mod.ts";

export type ClickupOptions = {
  personalApiKey: string;
};

/**
 * Factory function for the Clickup API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/clickup
 *
 * @param {string} personalApiKey - the personal API key to use for authentication
 * @returns {object} - an API client instance
 */
export const clickup = ({
  personalApiKey = Deno.env.get("CLICKUP_PERSONAL_API_KEY")!,
}: ClickupOptions) => {
  const api = createApi({
    baseURL: `https://api.clickup.com/api/v2`,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Authorization",
        value: personalApiKey,
      }, ctx);
    },
  });

  return api;
};
