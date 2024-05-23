import type { PluginRoute } from "$fresh/server.ts";
import { deepMerge } from "../../../deps/std/collections/deep_merge.ts";
import type { AuthConfig } from "../plugin.ts";
import {
  getAuthConfig,
  getFunctionsByProvider,
  getUserByProvider,
} from "../utils/providers/mod.ts";
import type { AuthProvider, AuthUser } from "../utils/types.ts";

export const getRoutesByProvider = (
  provider: AuthProvider,
  options: AuthConfig,
): PluginRoute[] => {
  const _providerOptions = options.providers?.[provider] ?? {};
  const [signIn, handleCallback, signOut] = getFunctionsByProvider(provider);

  const routes: PluginRoute[] = [
    {
      path: `/auth/${provider}/signin`,
      handler: async (req, ctx) => {
        const authConfig = getAuthConfig(provider, ctx);
        const response = await signIn(req, authConfig);
        return response;
      },
    },
    {
      path: `/auth/${provider}/callback`,
      handler: async (req, ctx) => {
        const authConfig = getAuthConfig(provider, ctx);
        const {
          response,
          tokens,
          sessionId,
        } = await handleCallback(req, authConfig);

        const userProvider = await getUserByProvider(
          provider,
          tokens.accessToken,
        );
        const userCurrent = await ctx.state.auth.getUser(userProvider.authId);

        const user = {
          sessionId,
          provider: userProvider.provider,
          authId: userProvider.authId,
          name: userProvider.name,
          email: userProvider.email,
          avatar: userProvider.avatar,
          projects: {
            [Deno.env.get("NETZO_PROJECT_ID")!]: {
              roles: {},
            },
          },
          data: {},
        } as unknown as AuthUser;

        console.log({ userProvider, userCurrent, user });

        if (userCurrent === null) {
          await ctx.state.auth.createUser(user);
        } else {
          const data = deepMerge(user, userCurrent);
          await ctx.state.auth.updateUser(data);
          await ctx.state.auth.updateUserSession(data, sessionId);
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
