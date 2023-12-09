import { useSignal } from "../../../../deps/@preact/signals.ts";
import type { PortalState } from "../../../../framework/plugins/portal/mod.ts";
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

// export type AuthFormProps = JSX.HTMLAttributes<HTMLDivElement> & {}

export function AuthForm(props: PortalState) {
  const {
    email,
    oauth2 = {},
    title,
    description,
    color,
    backgroundColor,
    logo,
  } = props;
  const isLoading = useSignal<boolean>(false);

  function onSubmit(event: Event) {
    event.preventDefault();
    isLoading.value = true;

    setTimeout(() => {
      isLoading.value = false;
    }, 3000);
  }

  const Buttons = () => {
    const getButtonProps = () => {
      if (false) {
        return {
          icon: <IconCustom className="w-4 h-4 mr-2" />,
          name: "OAuth",
        };
      } else if (false) {
        return {
          icon: <IconGoogle className="w-4 h-4 mr-2" />,
          name: "Google",
        };
      } else if (false) {
        return {
          icon: <IconAzure className="w-4 h-4 mr-2" />,
          name: "Azure",
        };
      } else if (isGitHubSetup()) {
        return {
          icon: <IconGithub className="w-4 h-4 mr-2" />,
          name: "GitHub",
        };
      } else if (false) {
        return {
          icon: <IconGitlab className="w-4 h-4 mr-2" />,
          name: "GitLab",
        };
      } else if (false) {
        return {
          icon: <IconAuth0 className="w-4 h-4 mr-2" />,
          name: "Auth0",
        };
      } else if (false) {
        return {
          icon: <IconOkta className="w-4 h-4 mr-2" />,
          name: "Okta",
        };
      } else {
        return {
          icon: <IconCustom className="w-4 h-4 mr-2" />,
          name: "OAuth",
        };
      }
    };

    const props = getButtonProps();

    const href = `/oauth/signin`;

    return (
      <a
        disabled={isLoading.value}
        href={href}
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        {isLoading.value
          ? <IconSpinner className="w-4 h-4 mr-2 animate-spin" />
          : props.icon} {props.name}
      </a>
    );
  };

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        {logo && (
          <img
            src={logo}
            className={cn("max-w-16 max-h-16 mb-4 mx-auto")}
          />
        )}
        {title && (
          <h1 className="text-2xl font-semibold tracking-tight">
            {title}
          </h1>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="grid gap-6">
        {email && (
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
        )}

        {oauth2 && <Buttons />}
      </div>
    </>
  );
}
