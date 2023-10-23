// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { defineRoute } from "$fresh/server.ts";
import type { SignedInState } from "@/plugins/session.ts";
import { BUTTON_STYLES, LINK_STYLES } from "@/utils/constants.ts";
import Head from "@/components/Head.tsx";
import GitHubAvatarImg from "@/components/GitHubAvatarImg.tsx";

export default defineRoute<SignedInState>((_req, ctx) => {
  const { sessionUser } = ctx.state;

  return (
    <>
      <Head title="Account" href={ctx.url.href} />
      <main class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center gap-8">
        <GitHubAvatarImg
          login={sessionUser.login}
          size={240}
          class="mx-auto"
        />
        <ul class="space-y-4">
          <li>
            <strong>Username</strong>
            <p class="flex flex-wrap justify-between">
              <span>
                {sessionUser.login}
              </span>
              <a href={`/users/${sessionUser.login}`} class={LINK_STYLES}>
                Go to my profile &#8250;
              </a>
            </p>
          </li>
          <li>
            <strong>Role</strong>
            <p class="flex flex-wrap justify-between">
              <span>
                {sessionUser.role}
              </span>
            </p>
          </li>
        </ul>
        <a
          href="/auth/signout?success_url=/"
          class={`${BUTTON_STYLES} block text-center`}
        >
          Sign out
        </a>
      </main>
    </>
  );
});
