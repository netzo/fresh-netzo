import type { AuthUserFromProvider } from "../types.ts";

export type UserOkta = {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
};

export async function getUserOkta(
  accessToken: string,
): Promise<AuthUserFromProvider> {
  const response = await fetch("https://api.okta.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(`${response.status}: ${message}`);
  }
  const userOkta: UserOkta = await response.json();
  return {
    provider: "okta",
    authId: userOkta.sub,
    name: userOkta.name,
    email: userOkta.email,
    avatar: userOkta.picture,
  };
}
