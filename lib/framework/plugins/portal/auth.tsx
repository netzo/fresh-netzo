import { defineRoute } from "../../../deps/$fresh/src/server/mod.ts";
import { AuthForm } from "./islands/auth-form.tsx";
import type { NetzoState } from "../../../framework/mod.ts";

// FIXME: not working for plugin-injected routes
// export const config: RouteConfig = { skipAppWrapper: true };

export default defineRoute<NetzoState>((_req, ctx) => {
  const {
    // title = "Sign In",
    // description,
    // color,
    backgroundColor,
    // logo,
    caption,
  } = ctx.state.portal;

  return (
    <div
      className={`h-full w-full grid place-items-center p-4 bg-[${backgroundColor}]`}
    >
      <div className="grid gap-6 w-full xs:w-[350px] max-w-[350px]">
        <AuthForm {...ctx.state.portal} />

        {caption && (
          <p
            className="px-8 text-sm text-center text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        )}
      </div>
    </div>
  );
});
