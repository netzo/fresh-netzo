import type { User as UserNetzo } from "../../../types.ts";
import type { AuthUserFromProvider } from "../types.ts";
import { handleCallback } from "./netzo.handle_callback.ts";
import { signIn } from "./netzo.sign_in.ts";

export { handleCallback, signIn };

export type NetzoClientConfig = Record<string | number | symbol, never>; // (empty object)

export const createNetzoClientConfig = () => {
  return {
    projectId: Deno.env.get("NETZO_PROJECT_ID")!,
    apiKey: Deno.env.get("NETZO_API_KEY")!,
  }; // MUST be set if using Netzo Auth Provider
};

export function isNetzoSetup() {
  try {
    createNetzoClientConfig();
    return true;
  } catch {
    return false;
  }
}

export async function getUserNetzo(
  accessToken: string,
): Promise<AuthUserFromProvider> {
  const { NETZO_API_URL = "https://api.netzo.io" } = Deno.env.toObject();
  const response = await fetch(`${NETZO_API_URL}/users`, {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(`${response.status}: ${message}`);
  }
  const data = await response.json();
  const userNetzo = data?.data?.[0] as UserNetzo;
  return {
    provider: "netzo",
    authId: userNetzo._id as string,
    name: userNetzo.name as string,
    email: userNetzo.email as string,
    avatar: userNetzo.avatar,
  };
}
