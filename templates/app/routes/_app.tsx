import Header from "netzo/plugins/auth/components/Header.tsx";
import Footer from "netzo/plugins/auth/components/Footer.tsx";
import type { AuthState } from "netzo/plugins/auth/mod.ts";
import { defineApp } from "$fresh/server.ts";

const kv = await Deno.openKv();

export default defineApp<AuthState>(async (_, ctx) => {
  const config = await kv.get(["netzo", "auth", "config"]);
  console.log(config)
  return (
    <div class="dark:bg-gray-900">
      <div class="flex flex-col min-h-screen mx-auto max-w-7xl w-full dark:text-white">
        <Header
          url={ctx.url}
          sessionUser={ctx.state.auth?.sessionUser}
        />
        <ctx.Component />
        <Footer url={ctx.url} />
      </div>
    </div>
  );
});
