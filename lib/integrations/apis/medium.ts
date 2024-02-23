import { auth } from "../create-api/auth/mod.ts";
import { createApi } from "../create-api/mod.ts";

export type MediumOptions = {
  accessToken: string;
};

/**
 * Factory function for the Medium API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/medium
 *
 * @param {string} accessToken - the token to use for authentication
 * @returns {object} - an API client instance
 */
export const medium = ({
  accessToken = Deno.env.get("MEDIUM_ACCESS_TOKEN")!,
}: MediumOptions) => {
  const api = createApi({
    baseURL: `https://api.medium.com/v1`,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: accessToken,
      }, ctx);
    },
  });

  return api;
};
