import { defineRoute } from "../../../../deps/$fresh/server.ts";
import { AuthForm } from "../islands/auth-form.tsx";
import type { NetzoState } from "../../../mod.ts";

// FIXME: not working for plugin-injected routes
// export const config: RouteConfig = { skipAppWrapper: true };

export default defineRoute<NetzoState>((_req, ctx) => {
  const { auth } = ctx.state.config;
  return (
    <div
      className={`h-full w-full grid place-items-center p-4 bg-[hsl(var(--background))]`}
    >
      <div className="grid gap-6 w-full xs:w-[350px] max-w-[350px]">
        <AuthForm {...ctx.state} />

        {auth?.caption && (
          <p
            className="px-8 text-sm text-center text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: auth.caption }}
          />
        )}
      </div>
    </div>
  );
});
