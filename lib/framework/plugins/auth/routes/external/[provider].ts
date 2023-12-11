import type { PluginRoute } from "../../../../../deps/$fresh/src/server/types.ts";
import {
  handleCallback,
  signIn,
  signOut,
} from "../../../../../deps/deno_kv_oauth/mod.ts";
import type { Project } from "../../../../mod.ts";
import {
  createUser,
  getUser,
  updateUser,
  updateUserSession,
  type User,
} from "./../../utils/db.ts";
import {
  getOAuthConfig,
  getUserByProvider,
  type OAuthProvider,
} from "../../utils/providers/mod.ts";

export const getRoutesByProvider = (
  provider: OAuthProvider,
  options: Project["providers"][OAuthProvider],
): PluginRoute[] => [
  {
    path: `/auth/${provider}/signin`,
    handler: async (req, _ctx) => {
      const oAuthConfig = getOAuthConfig(provider, options);
      const response = await signIn(req, oAuthConfig);
      return response;
    },
  },
  {
    path: `/auth/${provider}/callback`,
    handler: async (req, _ctx) => {
      const oAuthConfig = getOAuthConfig(provider, options);
      const { response, tokens, sessionId } = await handleCallback(
        req,
        oAuthConfig,
      );

      const userProvider = await getUserByProvider(
        provider,
        tokens.accessToken,
      );
      const userCurrent = await getUser(userProvider.authId);

      const user = {
        sessionId,
        authId: userProvider.authId,
        name: userProvider.name,
        email: userProvider.email,
        avatar: userProvider.avatar,
        provider: userProvider.provider,
        role: "admin",
      } as unknown as User;

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
    path: `/auth/signout`,
    handler: async (req, _ctx) => {
      const response = await signOut(req);
      return response;
    },
  },
];
