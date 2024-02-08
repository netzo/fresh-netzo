import type { PluginRoute } from "../../../deps/$fresh/server.ts";
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
  options: AuthConfig["providers"][AuthProvider],
): PluginRoute[] => {
  const [signIn, handleCallback, signOut] = getFunctionsByProvider(provider);

  const routes = [
    {
      path: `/auth/${provider}/signin`,
      handler: async (req, ctx) => {
        const authConfig = getAuthConfig(provider, options);
        const response = await signIn(req, authConfig);
        return response;
      },
    },
    {
      path: `/auth/${provider}/callback`,
      handler: async (req, ctx) => {
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
          roles: ["admin"],
        } as unknown as AuthUser;

        // [netzo] assert user is member of workspace this project belongs to (check apiKey)
        if (["netzo"].includes(provider)) {
          const {
            NETZO_API_KEY,
            NETZO_API_URL = "https://api.netzo.io",
          } = Deno.env.toObject(); // MUST be set if using Netzo Auth Provider
          const response = await fetch(
            `${NETZO_API_URL}/api-keys?apiKey=${NETZO_API_KEY}`,
            {
              headers: { authorization: `Bearer ${tokens.accessToken}` },
            },
          );
          const data = await response.json();
          const userHasAccessToWorkspaceOfApiKey = data?.data?.length === 1;
          if (!userHasAccessToWorkspaceOfApiKey) {
            return Response.redirect(
              "/auth?error=You do not have access to this application.",
            );
          }
        }

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
