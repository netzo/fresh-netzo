import type { AuthState } from "netzo/auth/plugins/session.ts";
import Head from "netzo/auth/components/Head.tsx";
import { defineRoute } from "$fresh/server.ts";

export default defineRoute<AuthState>((_req, ctx) => {
  const isSignedIn = ctx.state.auth.sessionUser !== undefined;
  const endpoint = "/api/items";

  return (
    <>
      <Head href={ctx.url.href}>
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
      <main class="flex-1 p-4">
        {JSON.stringify({ endpoint, isSignedIn })}
      </main>
    </>
  );
});
