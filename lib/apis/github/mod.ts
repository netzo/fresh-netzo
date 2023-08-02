import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
import {
  Issue,
  QueryIssues,
  QueryRepositories,
  QuerySearch,
  Repository,
  SearchResult,
  SearchTarget,
  User,
} from "@/lib/apis/github/types.ts";

export interface GithubOptions {
  personalAccessToken: string;
}

/**
 * SDK constructor function for the GitHub API
 *
 * @see https://netzo.io/docs/netzo/apis/github
 *
 * @param {string} apiKey - the API key to use for authentication
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

  /**
   * Get a user/organisation profile from Github.
   * If no username is provided, get authenticated user's profile
   */
  const getUser = async (username?: string): Promise<User> => {
    let result: User;
    if (username) {
      result = await api.users[`${username}`].get();
    } else {
      result = await api.user.get();
    }
    return result;
  };

  /**
   * Get a user's/organisation's repositories from Github
   * If no username is provided, get authenticated user's repositories
   */
  const getRepositories = async (
    username?: string,
    query: QueryRepositories = {},
  ): Promise<Repository[]> => {
    let result: Repository[];
    if (username) {
      result = await api.users[`${username}`].repos.get(query);
    } else {
      result = await api.user.repos.get(query);
    }
    return result;
  };

  /**
   * Get issues relevant to the authenticated user across owned, member, and organization repositories
   */
  const getIssues = async (query: QueryIssues = {}): Promise<Issue[]> => {
    const result = await api.issues.get(query);
    return result;
  };

  /**
   * Build a search query to search for specific items
   */
  const search = async (
    target: SearchTarget,
    query: QuerySearch,
  ): Promise<SearchResult> => {
    const result = await api.search[`${target}`].get(query);
    return result;
  };

  return { api, getUser, getRepositories, getIssues, search };
};
