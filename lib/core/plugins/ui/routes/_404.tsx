import { defineRoute } from "../../../../deps/$fresh/server.ts";
import type { NetzoState } from "../../../mod.ts";

export default defineRoute<NetzoState>((_req, ctx) => {
  return (
    <div class="h-full grid place-items-center">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1 class="mb-4 text-7xl font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
          404
        </h1>
        <p class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
          Not Found
        </p>
        <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          No matching route for{" "}
          <code class="font-mono">{ctx.url.pathname}</code>
        </p>
      </div>
    </div>
  );
});
