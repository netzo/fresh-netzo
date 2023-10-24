import type { State } from "netzo/authentication/plugins/session.ts";
import Head from "netzo/authentication/components/Head.tsx";
import { defineRoute } from "$fresh/server.ts";

export default defineRoute<State>((_req, ctx) => {
  const isSignedIn = ctx.state.sessionUser !== undefined;
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
