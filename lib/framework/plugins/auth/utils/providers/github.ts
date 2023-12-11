import { createHttpError } from "../../../../../deps/std/http/http_errors.ts";
import { createGitHubOAuthConfig } from "../../../../../deps/deno_kv_oauth/mod.ts";
import type { PartialUserFromProvider } from "../db.ts";

export function isGitHubSetup() {
  try {
    createGitHubOAuthConfig();
    return true;
  } catch {
    return false;
  }
}

export type UserGithub = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: unknown;
  company: string;
  blog: string;
  location: string;
  email: unknown;
  hireable: unknown;
  bio: string;
  twitter_username: unknown;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export async function getUserGithub(
  accessToken: string,
): Promise<PartialUserFromProvider> {
  const resp = await fetch("https://api.github.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!resp.ok) {
    const { message } = await resp.json();
    throw createHttpError(resp.status, message);
  }
  const userGithub: UserGithub = await resp.json();
  return {
    authId: userGithub.login,
    name: userGithub.name as string,
    email: userGithub.email as string,
    avatar: userGithub.avatar_url,
    provider: "github",
  };
}
