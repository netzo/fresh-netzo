import {
  createUser,
  deleteUserBySession,
  getUser,
  newUserProps,
  updateUser,
  type User,
} from "../../../utils/db.ts";
import { handleCallback } from "deno_kv_oauth/mod.ts";
import { oauth2Client } from "netzo/auth/utils/oauth2_client.ts";
import {
  deleteRedirectUrlCookie,
  getRedirectUrlCookie,
} from "netzo/auth/utils/redirect.ts";

type GitHubUser = {
  login: string;
  email: string;
};

async function getGitHubUser(accessToken: string): Promise<GitHubUser> {
  const response = await fetch("https://api.github.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    await response.body?.cancel();
    throw new Error();
  }
  return await response.json() as GitHubUser;
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
    const user: User = {
      login: githubUser.login,
      sessionId,
      ...newUserProps(),
    };
    await createUser(user);
  } else {
    await deleteUserBySession(sessionId);
    await updateUser({ ...user, sessionId });
  }
  return response;
}
