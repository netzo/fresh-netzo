import { defineRoute, type RouteConfig } from "../../../deps/$fresh/server.ts";
import { AuthForm } from "../islands/auth-form.tsx";
import { type AuthConfig } from "../plugin.ts";

// FIXME: not working for plugin-injected routes
// see https://github.com/denoland/fresh/issues/2296),
// https://github.com/denoland/fresh/issues/2352
// and https://github.com/denoland/fresh/pull/2297
export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default (config: AuthConfig) => {
  return defineRoute((req, ctx) => {
    return (
      <div
        className={`h-full w-full grid place-items-center p-4 bg-background`}
      >
        <div className="grid gap-6 w-full xs:w-[350px] max-w-[350px]">
          <AuthForm config={config} request={req} />

          {config?.caption && (
            <p
              className="px-8 text-sm text-center text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: config.caption }}
            />
          )}
        </div>
      </div>
    );
  });
};
