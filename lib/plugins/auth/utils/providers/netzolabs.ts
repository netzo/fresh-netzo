import type { AuthUserFromProvider } from "../types.ts";
import { UserGoogle } from "./google.ts";

export type UserNetzolabs = UserGoogle;

export async function getUserNetzolabs(
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
  const userNetzolabs: UserNetzolabs = await response.json();
  return {
    provider: "netzolabs",
    authId: userNetzolabs.sub,
    name: userNetzolabs.name,
    email: userNetzolabs.email,
    avatar: userNetzolabs.picture,
  };
}
