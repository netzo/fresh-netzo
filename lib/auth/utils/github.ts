import { createHttpError } from "std/http/http_errors.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";

export function isGitHubSetup() {
  try {
    createGitHubOAuthConfig();
    return true;
  } catch {
    return false;
  }
}

type GitHubUser = {
  login: string;
  email: string;
};

/**
 * Returns the GitHub profile information of the user with the given access
 * token.
 *
 * @see {@link https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user}
 *
 * @example
 * ```ts
 * import { getGitHubUser } from "netzo/auth/utils/github.ts";
 *
 * const user = await getGitHubUser("<access token>");
 * user.login; // Returns "octocat"
 * user.email; // Returns "octocat@github.com"
 * ```
 */
export async function getGitHubUser(accessToken: string) {
  const resp = await fetch("https://api.github.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!resp.ok) {
    const { message } = await resp.json();
    throw createHttpError(resp.status, message);
  }
  return await resp.json() as Promise<GitHubUser>;
}
