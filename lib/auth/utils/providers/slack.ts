import { createSlackOAuthConfig } from "../../../deps/deno_kv_oauth/mod.ts";
import type { AuthUserFromProvider } from "../db.ts";

export { createSlackOAuthConfig };

export function isSlackSetup(
  options: Parameters<typeof createSlackOAuthConfig>[0],
) {
  try {
    createSlackOAuthConfig(options);
    return true;
  } catch {
    return false;
  }
}

export type AuthSlackResponse = {
  ok: boolean;
  url: string;
  team: string;
  user: string;
  team_id: string;
  user_id: string;
};

export type UserSlack = {
  id: string;
  team_id: string;
  name: string;
  deleted: boolean;
  color: string;
  real_name: string;
  tz: string;
  tz_label: string;
  tz_offset: number;
  profile: {
    avatar_hash: string;
    status_text: string;
    status_emoji: string;
    real_name: string;
    display_name: string;
    real_name_normalized: string;
    display_name_normalized: string;
    email: string;
    // image_<sizeInPx>:
    image_original: string;
    image_24: string;
    image_32: string;
    image_48: string;
    image_72: string;
    image_192: string;
    image_512: string;
    team: string;
  };
  is_admin: boolean;
  is_owner: boolean;
  is_primary_owner: boolean;
  is_restricted: boolean;
  is_ultra_restricted: boolean;
  is_bot: boolean;
  updated: number;
  is_app_user: boolean;
  has_2fa: boolean;
};

export type UserSlackResponse = {
  ok: boolean;
  user: UserSlack;
};

export async function getUserSlack(
  accessToken: string,
): Promise<AuthUserFromProvider> {
  const baseURL = "https://slack.com/api";
  const headers = {
    authorization: `Bearer ${accessToken}`,
    accept: "application/json",
    "content-type": "application/json",
  };
  // see https://api.slack.com/methods/auth.test
  const responseAuth = await fetch(`${baseURL}/auth.test`, {
    method: "POST",
    headers,
  });
  if (!responseAuth.ok) {
    const { message } = await responseAuth.json();
    throw new Error(`${responseAuth.status}: ${message}`);
  }
  const authSlack: AuthSlackResponse = await responseAuth.json();
  if (!authSlack.ok) {
    throw new Error("401: Slack authentication failed");
  }

  // see https://api.slack.com/methods/users.info
  const response = await fetch(
    `${baseURL}/users.info?user=${authSlack.user_id}`,
    {
      method: "GET",
      headers,
    },
  );
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(`${response.status}: ${message}`);
  }
  const userSlack: UserSlackResponse = await response.json();
  return {
    provider: "slack",
    authId: userSlack.user.id,
    name: userSlack.user.name,
    email: userSlack.user?.profile?.email,
    avatar: userSlack.user?.profile?.image_192, // means 192x192 size
  };
}
