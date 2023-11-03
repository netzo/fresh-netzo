import type { AuthState } from "netzo/plugins/auth/mod.ts";
import { getUser } from "netzo/plugins/auth/utils/db.ts";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LINK_STYLES } from "netzo/plugins/auth/utils/constants.ts";
import Head from "netzo/plugins/auth/components/Head.tsx";
import GitHubAvatarImg from "netzo/plugins/auth/components/GitHubAvatarImg.tsx";
import { defineRoute } from "$fresh/server.ts";

interface UserProfileProps {
  login: string;
  role: "admin" | "edit" | "view";
}

function UserProfile(props: UserProfileProps) {
  return (
    <div class="flex flex-col items-center w-[16rem]">
      <GitHubAvatarImg login={props.login} size={200} />
      <div class="flex gap-x-2 px-4 mt-4 items-center">
        <div class="font-semibold text-xl">
          {props.login}
        </div>
        {props.role}
        <a
          href={`https://github.com/${props.login}`}
          aria-label={`${props.login}'s GitHub profile`}
          class={LINK_STYLES}
          target="_blank"
        >
          <GitHubLogoIcon class="w-6" />
        </a>
      </div>
    </div>
  );
}

export default defineRoute<AuthState>(
  async (_req, ctx) => {
    const { login } = ctx.params;
    const user = await getUser(login);
    if (user === null) return await ctx.renderNotFound();

    const isSignedIn = ctx.state.auth.sessionUser !== undefined;
    const endpoint = `/api/users/${login}/items`;

    return (
      <>
        <Head title={user.login} href={ctx.url.href}>
          <link
            as="fetch"
            crossOrigin="anonymous"
            href={endpoint}
            rel="preload"
          />
          {isSignedIn && (
            <link
              as="fetch"
              crossOrigin="anonymous"
              href="/api/me/votes"
              rel="preload"
            />
          )}
        </Head>
        <main class="flex-1 p-4 flex flex-col md:flex-row gap-8">
          <div class="flex justify-center p-4">
            <UserProfile {...user} />
          </div>
          {JSON.stringify({ endpoint, isSignedIn })}
        </main>
      </>
    );
  },
);
