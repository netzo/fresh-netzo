import { ComponentChildren } from "../../../../deps/preact.ts";
import { useSignal } from "../../../../deps/@preact/signals.ts";
import type { AuthState } from "../../../../framework/plugins/auth/mod.ts";
import { cn } from "../../../../components/utils.ts";
import { Button, buttonVariants } from "../../../../components/ui/button.tsx";
import { Input } from "../../../../components/ui/input.tsx";
import { Label } from "../../../../components/ui/label.tsx";
import {
  IconAuth0,
  IconAzure,
  IconCustom,
  IconGithub,
  IconGitlab,
  IconGoogle,
  IconOkta,
  IconSpinner,
} from "../components/icons.tsx";
import { isGitHubSetup } from "../utils/providers/github.ts";

export type AuthFormProps = JSX.HTMLAttributes<HTMLDivElement> & NetzoState;

const ButtonEmail = (props: ComponentChildren) => {
  const isLoading = useSignal<boolean>(false);

  function onSubmit(event: Event) {
    event.preventDefault();
    isLoading.value = true;

    setTimeout(() => {
      isLoading.value = false;
    }, 3000);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
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
              disabled={isLoading.value}
            />
          </div>
          <Button variant="default" disabled={isLoading.value}>
            {isLoading.value && (
              <IconSpinner className="w-4 h-4 mr-2 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
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
    </>
  );
};

const ButtonOAuth2 = (props: ComponentChildren & { text: string, href: string }) => {
  const { href = `/oauth/signin` } = props;

  return (
    <a
      disabled={isLoading.value}
      href={href}
      className={cn(buttonVariants({ variant: "outline" }))}
    >
      {isLoading.value
        ? <IconSpinner className="w-4 h-4 mr-2 animate-spin" />
        : props.children} {props.text}
    </a>
  );
};

export function AuthForm(props: NetzoState) {
  const { logo, auth } = props;

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
        {!!auth?.providers?.email?.enabled && <ButtonEmail />}

        {!!auth?.providers?.google?.enabled && (
          <Button text="Sign In with Google">
            <IconGoogle className="w-4 h-4 mr-2" />
          </Button>
        )}

      </div>
    </>
  );
}
