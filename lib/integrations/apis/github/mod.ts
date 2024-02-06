import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export type GithubOptions = {
  personalAccessToken: string;
};

/**
 * Factory function for the GitHub API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/github
 *
 * @param {string} personalAccessToken - the token to use for authentication
 * @returns {object} - an API client instance
 */
export const github = ({
  personalAccessToken = Deno.env.get("GITHUB_PERSONAL_ACCESS_TOKEN")!,
}: GithubOptions) => {
  const api = createApi({
    baseURL: "https://api.github.com",
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: personalAccessToken,
      }, ctx);
    },
  });

  return api;
};