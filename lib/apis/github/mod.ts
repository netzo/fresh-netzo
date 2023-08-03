import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
export type {
  Issue,
  QueryIssues,
  QueryRepositories,
  QuerySearch,
  Repository,
  SearchResult,
  SearchTarget,
  User,
} from "./types.ts";

export interface GithubOptions {
  personalAccessToken: string;
}

/**
 * SDK constructor function for the GitHub API
 *
 * @see https://netzo.io/docs/netzo/apis/github
 *
 * @param {string} personalAccessToken - the token to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const github = ({
  personalAccessToken = Deno.env.get("GITHUB_PERSONAL_ACCESS_TOKEN")!,
}: GithubOptions) => {
  const api = createApi({
    baseURL: "https://api.github.com",
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: personalAccessToken,
      }, ctx);
    },
  });

  return { api };
};
