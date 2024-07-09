import type { PluginRoute } from "fresh/server.ts";
import { locales } from "../i18n.ts";
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
  const { locale = "es" } = options;
  const { allowNewUserRegistration = true } = options.providers?.[provider] ?? {};
  const [signIn, handleCallback, signOut] = getFunctionsByProvider(provider);

  const i18n = locales[locale];

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
        let userCurrent = await ctx.state.auth.getUser(userProvider.authId);
        if (!userCurrent) {
          // IMPORTANT: authId can be provisionally hard-coded to the unique email of the user
          // when first being invited or when manually creating users in the database therefore
          // we also attempt to find the user by email if the above query by authId fails
          userCurrent = await ctx.state.auth.getInvitedUser(userProvider.email);
        }

        // IMPORTANT: must explicitly set all properties to prevent "undefined" values
        const user = {
          id: userCurrent?.id,
          sessionId,
          provider: userProvider?.provider,
          authId: userProvider?.authId,
          name: userProvider?.name,
          email: userProvider?.email,
          avatar: userProvider?.avatar,
          data: options?.resolveUserData
            ? options?.resolveUserData?.(userCurrent ?? {}, req, ctx) ?? {}
            : userCurrent?.data ?? {}, // else keep existing data
          createdAt: userCurrent?.createdAt,
          updatedAt: userCurrent?.updatedAt,
          deletedAt: userCurrent?.deletedAt,
        } as unknown as AuthUser;

        // IMPORTANT: remove undefined values to prevent error "Unsupported type of value"
        // and let the database handle setting defaults (e.g. null or anything else)
        Object.keys(user).forEach((key) => {
          if (user[key] === undefined) delete user[key];
        });

        console.log({ userProvider, userCurrent, user });

        if (!userCurrent) {
          if (allowNewUserRegistration === true) {
            await ctx.state.auth.createUser(user);
            await ctx.state.auth.createUserSession(user, sessionId);
          } else {
            return new Response("", {
              status: 307,
              headers: { Location: `/auth?error=${i18n.newUserRegistrationNotAllowed}` },
            }); // redirect to relative path
          }
        } else {
          await ctx.state.auth.updateUser(user);
          await ctx.state.auth.updateUserSession(user, sessionId);
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
