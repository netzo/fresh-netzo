import type { PluginRoute } from "../../../../deps/$fresh/server.ts";
import type { NetzoConfig } from "../../../mod.ts";
import {
  type AuthUser,
  createUser,
  getUser,
  updateUser,
  updateUserSession,
} from "../utils/db.ts";
import {
  type AuthProvider,
  getAuthConfig,
  getFunctionsByProvider,
  getUserByProvider,
} from "../utils/providers/mod.ts";

export const getRoutesByProvider = (
  provider: AuthProvider,
  options: NetzoConfig["auth"]["providers"][AuthProvider],
): PluginRoute[] => {
  const [signIn, handleCallback, signOut] = getFunctionsByProvider(provider);

  const routes = [
    {
      path: `/auth/${provider}/signin`,
      handler: async (req, _ctx) => {
        const authConfig = getAuthConfig(provider, options);
        const response = await signIn(req, authConfig);
        return response;
      },
    },
    {
      path: `/auth/${provider}/callback`,
      handler: async (req, _ctx) => {
        const authConfig = getAuthConfig(provider, options);
        const { response, tokens, sessionId } = await handleCallback(
          req,
          authConfig,
        );

        const userProvider = await getUserByProvider(
          provider,
          tokens.accessToken,
        );
        const userCurrent = await getUser(userProvider.authId);

        const user = {
          sessionId,
          provider: userProvider.provider,
          authId: userProvider.authId,
          name: userProvider.name,
          email: userProvider.email,
          avatar: userProvider.avatar,
          role: "admin",
        } as unknown as AuthUser;

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

  return routes;
};
