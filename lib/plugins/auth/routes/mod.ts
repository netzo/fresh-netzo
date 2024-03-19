import type { PluginRoute } from "$fresh/server.ts";
import type { AuthConfig } from "../plugin.ts";
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
  options: AuthConfig,
): PluginRoute[] => {
  const providerOptions = options.providers?.[provider] ?? {};
  const [signIn, handleCallback, signOut] = getFunctionsByProvider(provider);

  const routes: PluginRoute[] = [
    {
      path: `/auth/${provider}/signin`,
      handler: async (req, _ctx) => {
        const authConfig = getAuthConfig(provider, providerOptions);
        const response = await signIn(req, authConfig);
        return response;
      },
    },
    {
      path: `/auth/${provider}/callback`,
      handler: async (req, _ctx) => {
        const authConfig = getAuthConfig(provider, providerOptions);
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
          roles: ["admin"],
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
