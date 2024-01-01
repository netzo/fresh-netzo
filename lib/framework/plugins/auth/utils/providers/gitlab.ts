import { createHttpError } from "../../../../../deps/std/http/http_errors.ts";
import { createGitLabOAuthConfig } from "../../../../../deps/deno_kv_oauth/mod.ts";
import type { AuthUserFromProvider } from "../db.ts";

export { createGitLabOAuthConfig };

export function isGitlabSetup(
  options: Parameters<typeof createGitLabOAuthConfig>[0],
) {
  try {
    createGitLabOAuthConfig(options);
    return true;
  } catch {
    return false;
  }
}

export type UserGitlab = {
  id: number;
  username: string;
  email: string;
  name: string;
  state: string;
  avatar_url: string;
  web_url: string;
  created_at: string;
  bio: string;
  location: string;
  public_email: string;
  skype: string;
  linkedin: string;
  twitter: string;
  website_url: string;
  organization: string;
  last_sign_in_at: string;
  confirmed_at: string;
  theme_id: number;
  last_activity_on: string;
  color_scheme_id: number;
  projects_limit: number;
  current_sign_in_at: string;
  identities: unknown[];
  can_create_group: boolean;
  can_create_project: boolean;
  two_factor_enabled: boolean;
  external: boolean;
  private_profile: boolean;
  shared_runners_minutes_limit: number;
  extra_shared_runners_minutes_limit: number;
};

export async function getUserGitlab(
  accessToken: string,
): Promise<AuthUserFromProvider> {
  const response = await fetch("https://gitlab.com/api/v4/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw createHttpError(response.status, message);
  }
  const userGitlab: UserGitlab = await response.json();
  return {
    provider: "gitlab",
    authId: String(userGitlab.id),
    name: userGitlab.name,
    email: userGitlab.email,
    avatar: userGitlab.avatar_url,
  };
}
