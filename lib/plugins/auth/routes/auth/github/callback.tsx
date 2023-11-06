import {
  createUser,
  deleteUserBySession,
  getUser,
  updateUser,
  type User,
} from "../../../utils/db.ts";
import { handleCallback } from "deno_kv_oauth/mod.ts";
import { oauth2Client } from "netzo/plugins/auth/utils/oauth2_client.ts";
import {
  deleteRedirectUrlCookie,
  getRedirectUrlCookie,
} from "netzo/plugins/auth/utils/redirect.ts";
import type { UserGitHub } from "../../../utils/providers/github.ts";

async function getGitHubUser(accessToken: string): Promise<UserGitHub> {
  const response = await fetch("https://api.github.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    await response.body?.cancel();
    throw new Error();
  }
  return await response.json() as UserGitHub;
}

export default async function CallbackPage(req: Request) {
  const { response, accessToken, sessionId } = await handleCallback(
    req,
    oauth2Client,
    getRedirectUrlCookie(req.headers),
  );

  deleteRedirectUrlCookie(response.headers);

  const githubUser = await getGitHubUser(accessToken);

  const user = await getUser(githubUser.login);
  if (!user) {
    const user = {
      login: githubUser.login,
      sessionId,
      name: githubUser.name,
      email: githubUser.email,
      role: "admin",
    } as User;
    await createUser(user);
  } else {
    await deleteUserBySession(sessionId);
    await updateUser({ ...user, sessionId });
  }
  return response;
}
