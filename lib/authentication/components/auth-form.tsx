import { useSignal } from "@preact/signals";
import type { OAuth2ClientConfig } from "deno_kv_oauth/deps.ts";
import type { AuthenticationPageProps } from "../routes/auth.tsx";
import { cn } from "netzo/components/utils.ts";
import { Button, buttonVariants } from "netzo/components/ui/button.tsx";
import { Input } from "netzo/components/ui/input.tsx";
import { Label } from "netzo/components/ui/label.tsx";
import {
  IconAuth0,
  IconAzure,
  IconCustom,
  IconGithub,
  IconGitlab,
  IconGoogle,
  IconOkta,
  IconSpinner,
} from "./icons.tsx";

// export interface AuthFormProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function AuthForm(props: AuthenticationPageProps) {
  const { providers = {} } = props.state?.options ?? {};
  const isLoading = useSignal<boolean>(false);

  function onSubmit(event: Event) {
    event.preventDefault();
    isLoading.value = true;

    setTimeout(() => {
      isLoading.value = false;
    }, 3000);
  }

  const Buttons = () => {
    return (
      <>
        {Object.entries(providers).map(([uid, options]) => {
          const props = {
            custom: {
              icon: <IconCustom className="mr-2 h-4 w-4" />,
              name: "OAuth",
            },
            google: {
              icon: <IconGoogle className="mr-2 h-4 w-4" />,
              name: "Google",
            },
            azure: {
              icon: <IconAzure className="mr-2 h-4 w-4" />,
              name: "Azure",
            },
            github: {
              icon: <IconGithub className="mr-2 h-4 w-4" />,
              name: "GitHub",
            },
            gitlab: {
              icon: <IconGitlab className="mr-2 h-4 w-4" />,
              name: "GitLab",
            },
            auth0: {
              icon: <IconAuth0 className="mr-2 h-4 w-4" />,
              name: "Auth0",
            },
            okta: {
              icon: <IconOkta className="mr-2 h-4 w-4" />,
              name: "Okta",
            },
          }?.[uid]!;

          const href = `/auth/signin`;

          return (
            <a
              disabled={isLoading.value}
              href={href}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {isLoading.value
                ? <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
                : props.icon} {props.name}
            </a>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign In
        </h1>
        {
          /* <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p> */
        }
      </div>
      <div className="grid gap-6" {...props}>
        {
          /* <form onSubmit={onSubmit}>
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
            <Button disabled={isLoading.value}>
              {isLoading.value && (
                <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </form> */
        }
        {
          /* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div> */
        }

        <Buttons />
      </div>
    </>
  );
}
