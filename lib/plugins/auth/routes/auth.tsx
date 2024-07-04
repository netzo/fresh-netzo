import { FreshContext, type RouteConfig } from "fresh";
import { NetzoState } from "netzo/mod.ts";
import { cn } from "../../../components/utils.ts";
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
  return (ctx: FreshContext<NetzoState>) => {
    const AuthFormWithCaption = () => (
      <div className="grid gap-6 w-full xs:w-[350px] max-w-[350px] pb-16">
        <AuthForm config={config} request={ctx.req} />

        {config?.caption && (
          <p
            className="px-8 text-sm text-center text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: config.caption }}
          />
        )}
      </div>
    );

    if (config.image) {
      return (
        <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="h-full flex items-center justify-center py-12">
            <AuthFormWithCaption />
          </div>
          <div className="hidden bg-muted lg:block">
            <img
              src={config.image.src}
              alt="Netzo Authentication"
              width="1920"
              height="1080"
              className={cn(
                "w-full h-full object-cover",
                config.image?.className!,
              )}
              {...config.image}
            />
          </div>
        </div>
      );
    }

    return (
      <div
        className={`w-full h-full grid place-items-center p-4 bg-background`}
      >
        <AuthFormWithCaption />
      </div>
    );
  };
};
