import Header from "netzo/auth/components/Header.tsx";
import Footer from "netzo/auth/components/Footer.tsx";
import type { State } from "netzo/auth/plugins/session.ts";
import { defineApp } from "$fresh/server.ts";

export default defineApp<State>((_, ctx) => {
  return (
    <div class="dark:bg-gray-900">
      <div class="flex flex-col min-h-screen mx-auto max-w-7xl w-full dark:text-white">
        <Header
          url={ctx.url}
          sessionUser={ctx.state?.sessionUser}
        />
        <ctx.Component />
        <Footer url={ctx.url} />
      </div>
    </div>
  );
});
