import type { User as UserNetzo } from "../../../types.ts";
import type { AuthUserFromProvider } from "../types.ts";
import { handleCallbackNetzo } from "./netzo.handle_callback.ts";
import { signInNetzo } from "./netzo.sign_in.ts";

export { handleCallbackNetzo, signInNetzo };

export type NetzoAuthConfig = {
  projectId: string;
  apiKey: string;
};

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
