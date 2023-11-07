import type { Plugin } from "$fresh/server.ts";
import { handleCallback, signIn, signOut } from "deno_kv_oauth/mod.ts";
import {
  createUser,
  getUser,
  updateUser,
  updateUserSession,
  type User,
} from "../utils/db.ts";
import { getUserGithub } from "../utils/providers/github.ts";
import Auth from "../routes/auth.tsx";
import type { AuthOptions } from "../mod.ts";
import type { NetzoState as _NetzoState } from "../../../config/mod.ts";

type NetzoState = Required<Pick<_NetzoState, 'auth'>> & _NetzoState

// Exported for mocking and spying in e2e tests
export const _internals = { handleCallback };

export const routes = (options: AuthOptions): Required<Plugin<NetzoState>>['routes'] => {
  return [
    {
      path: "/auth",
      handler: (_req, ctx) => ctx.render(),
      component: Auth,
    },
    {
      path: `/oauth/signin`,
      handler: async (req, _ctx) => {
        const response = await signIn(req, options.oauth2);
        return response;
      },
    },
    {
      path: `/oauth/callback`,
      handler: async (req, _ctx) => {
        const { response, tokens, sessionId } = await handleCallback(
          req,
          options.oauth2,
        );
        const userGithub = await getUserGithub(tokens.accessToken);
        const userCurrent = await getUser(userGithub.login);

        const user = {
          login: userGithub.login,
          sessionId,
          name: userGithub.name,
          email: userGithub.email,
          avatar: userGithub.avatar_url,
          role: "admin",
        } as User;

        if (userCurrent === null) {
          await createUser(user);
        } else {
          await updateUser({ ...user, ...userCurrent });
          await updateUserSession({ ...user, ...userCurrent }, sessionId);
        }

        return response;
      },
    },
    {
      path: `/oauth/signout`,
      handler: async (req, _ctx) => {
        const response = await signOut(req);
        return response;
      },
    },
  ];
};
