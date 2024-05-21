import type { AuthUserFromProvider } from "../types.ts";

export type UserGoogle = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
  hd: string;
};

export async function getUserGoogle(
  accessToken: string,
): Promise<AuthUserFromProvider> {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { authorization: `Bearer ${accessToken}` },
    },
  );
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(`${response.status}: ${message}`);
  }
  const userGoogle: UserGoogle = await response.json();
  return {
    provider: "google",
    authId: userGoogle.sub,
    name: userGoogle.name,
    email: userGoogle.email,
    avatar: userGoogle.picture,
  };
}
