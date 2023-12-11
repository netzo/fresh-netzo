import type { ComponentChildren, JSX } from "../../../../deps/preact.ts";
import type { NetzoState } from "../../../../framework/mod.ts";
import { cn } from "../../../../components/utils.ts";
import { Button, buttonVariants } from "../../../../components/ui/button.tsx";
import { Input } from "../../../../components/ui/input.tsx";
import { Label } from "../../../../components/ui/label.tsx";
// TODO: import { isGitHubSetup } from "../utils/providers/github.ts";

export type AuthFormProps = JSX.HTMLAttributes<HTMLDivElement> & NetzoState;

const ButtonEmail = () => {
  return (
    <div className="grid gap-2">
      <div className="grid gap-1">
        <Label className="sr-only" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
        />
      </div>
      <Button variant="default" type="submit">
        Sign In with Email
      </Button>
    </div>
  );
};

const ButtonOAuth2 = (
  props: {
    text: string;
    href: string;
    // TODO: disabled: boolean; // use e.g. isGitHubSetup() utils for this
    children: ComponentChildren;
  },
) => {
  return (
    <a
      href={props.href}
      className={cn(buttonVariants({ variant: "outline" }))}
    >
      {props.children} {props.text}
    </a>
  );
};

export function AuthForm(props: NetzoState) {
  const { logo, auth } = props.config;

  const hasEnabledOauth2Providers = Object.entries(auth?.providers ?? {}).some(
    ([key, value]) => !["email"].includes(key) && !!value.enabled,
  );

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        {logo && (
          <img
            src={logo}
            className={cn("max-w-16 max-h-16 mb-4 mx-auto")}
          />
        )}
        {auth?.title && (
          <h1 className="text-2xl font-semibold tracking-tight">
            {auth.title}
          </h1>
        )}
        {auth?.description && (
          <p className="text-sm text-muted-foreground">
            {auth.description}
          </p>
        )}
      </div>
      <div className="grid gap-6">
        {!!auth?.providers?.email?.enabled && (
          <form method="POST" action="/auth/email">
            <ButtonEmail />
          </form>
        )}

        {hasEnabledOauth2Providers && (
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-[hsl(var(--background))]">
                Or continue with
              </span>
            </div>
          </div>
        )}

        {!!auth?.providers?.google?.enabled && (
          <ButtonOAuth2 text="Sign In with Google" href="/auth/google/signin">
            <div className="mr-4 w-20px h-20px logos-google-icon" />
          </ButtonOAuth2>
        )}

        {!!auth?.providers?.github?.enabled && (
          <ButtonOAuth2 text="Sign In with GitHub" href="/auth/github/signin">
            <div className="mr-4 w-20px h-20px mdi-github" />
          </ButtonOAuth2>
        )}

        {!!auth?.providers?.gitlab?.enabled && (
          <ButtonOAuth2 text="Sign In with GitLab" href="/auth/gitlab/signin">
            <div className="mr-4 w-20px h-20px mdi-gitlab" />
          </ButtonOAuth2>
        )}

        {!!auth?.providers?.auth0?.enabled && (
          <ButtonOAuth2 text="Sign In with Auth0" href="/auth/auth0/signin">
            <div className="mr-4 w-20px h-20px simple-icons-auth0" />
          </ButtonOAuth2>
        )}
        {!!auth?.providers?.okta?.enabled && (
          <ButtonOAuth2 text="Sign In with Okta" href="/auth/okta/signin">
            <div className="mr-4 w-20px h-20px simple-icons-okta" />
          </ButtonOAuth2>
        )}

        {!!auth?.providers?.oauth2?.enabled && (
          <ButtonOAuth2 text="Sign In with Custom" href="/auth/oauth2/signin">
            <div className="mr-4 w-20px h-20px mdi-code-json" />
          </ButtonOAuth2>
        )}
      </div>
    </>
  );
}
