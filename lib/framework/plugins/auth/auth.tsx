import { defineRoute } from "../../../deps/$fresh/src/server/mod.ts";
import { AuthForm } from "./islands/auth-form.tsx";
import type { NetzoState } from "../../../framework/mod.ts";

// FIXME: not working for plugin-injected routes
// export const config: RouteConfig = { skipAppWrapper: true };

export default defineRoute<NetzoState>((_req, ctx) => {
  return (
    <div
      className={`h-full w-full grid place-items-center p-4 bg-[hsl(var(--background))]`}
    >
      <div className="grid gap-6 w-full xs:w-[350px] max-w-[350px]">
        <AuthForm {...ctx.state} />

        {ctx.state.auth?.caption && (
          <p
            className="px-8 text-sm text-center text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: ctx.state.auth.caption }}
          />
        )}
      </div>
    </div>
  );
});
