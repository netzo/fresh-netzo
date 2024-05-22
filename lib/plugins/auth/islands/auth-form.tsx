import type { JSX } from "preact";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/alert.tsx";
import { Button, buttonVariants } from "../../../components/button.tsx";
import { Input } from "../../../components/input.tsx";
import { Label } from "../../../components/label.tsx";
import { cn } from "../../../components/utils.ts";
import type { AuthConfig } from "../plugin.ts";

export type AuthFormProps = JSX.HTMLAttributes<HTMLDivElement> & {
  config: AuthConfig;
  request: Request;
};

export function AuthForm(props: AuthFormProps) {
  const url = new URL(props.request.url);
  const error = url.searchParams.get("error");

  const { logo, title, description, providers } = props.config;

  const hasEmail = !!providers?.email;
  const hasOAuth2 = Object.entries(providers ?? {}).some(
    ([key, value]) => !["email"].includes(key) && !!value,
  );
  const showDivider = hasEmail && hasOAuth2;

  const i18n = ({
    en: {
      emailButton: "Sign In with Email",
      text: "Sign In with",
      divider: "Or continue with",
    },
    es: {
      emailButton: "Inicia sesión con Email",
      text: "Inicia sesión con",
      divider: "O continua con",
    },
  })?.[props.config.locale ?? "es"]!;

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        {logo && (
          <img src={logo} alt="Logo" className="mx-auto mb-4 w-16 h-16" />
        )}
        {title && (
          <h1 className="text-2xl font-semibold">
            {title}
          </h1>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>
            Error
          </AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {!!providers?.email && (
          <form method="POST" action="/auth/email">
            <ButtonEmail />
          </form>
        )}

        {showDivider && (
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background">
                {i18n.divider}
              </span>
            </div>
          </div>
        )}

        {!!providers?.netzo && (
          <ButtonNetzo text={`${i18n.text} Netzo`} href="/auth/netzo/signin">
            <div className="mr-4 w-22px h-22px i-netzo-symbol" />
          </ButtonNetzo>
        )}

        {!!providers?.google && (
          <ButtonOAuth2 text={`${i18n.text} Google`} href="/auth/google/signin">
            {/* NOTE: use inline SVG instead of logos-google-icon to avoid having to load logos collection (7MB) */}
            <svg
              className="mr-4 w-20px h-20px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 262"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              />
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              />
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
              />
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              />
            </svg>
          </ButtonOAuth2>
        )}

        {!!providers?.github && (
          <ButtonOAuth2 text={`${i18n.text} GitHub`} href="/auth/github/signin">
            <div className="mr-4 w-20px h-20px mdi-github" />
          </ButtonOAuth2>
        )}

        {!!providers?.gitlab && (
          <ButtonOAuth2 text={`${i18n.text} GitLab`} href="/auth/gitlab/signin">
            <div className="mr-4 w-20px h-20px mdi-gitlab" />
          </ButtonOAuth2>
        )}

        {!!providers?.slack && (
          <ButtonOAuth2 text={`${i18n.text} Slack`} href="/auth/slack/signin">
            {/* NOTE: use inline SVG instead of logos-slack-icon to avoid having to load logos collection (7MB) */}
            <svg
              className="mr-4 w-20px h-20px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
            >
              <path
                fill="#E01E5A"
                d="M53.841 161.32c0 14.832-11.987 26.82-26.819 26.82c-14.832 0-26.819-11.988-26.819-26.82c0-14.831 11.987-26.818 26.82-26.818H53.84zm13.41 0c0-14.831 11.987-26.818 26.819-26.818c14.832 0 26.819 11.987 26.819 26.819v67.047c0 14.832-11.987 26.82-26.82 26.82c-14.83 0-26.818-11.988-26.818-26.82z"
              />
              <path
                fill="#36C5F0"
                d="M94.07 53.638c-14.832 0-26.82-11.987-26.82-26.819C67.25 11.987 79.239 0 94.07 0s26.819 11.987 26.819 26.819v26.82zm0 13.613c14.832 0 26.819 11.987 26.819 26.819c0 14.832-11.987 26.819-26.82 26.819H26.82C11.987 120.889 0 108.902 0 94.069c0-14.83 11.987-26.818 26.819-26.818z"
              />
              <path
                fill="#2EB67D"
                d="M201.55 94.07c0-14.832 11.987-26.82 26.818-26.82c14.832 0 26.82 11.988 26.82 26.82s-11.988 26.819-26.82 26.819H201.55zm-13.41 0c0 14.832-11.988 26.819-26.82 26.819c-14.831 0-26.818-11.987-26.818-26.82V26.82C134.502 11.987 146.489 0 161.32 0c14.831 0 26.819 11.987 26.819 26.819z"
              />
              <path
                fill="#ECB22E"
                d="M161.32 201.55c14.832 0 26.82 11.987 26.82 26.818c0 14.832-11.988 26.82-26.82 26.82c-14.831 0-26.818-11.988-26.818-26.82V201.55zm0-13.41c-14.831 0-26.818-11.988-26.818-26.82c0-14.831 11.987-26.818 26.819-26.818h67.25c14.832 0 26.82 11.987 26.82 26.819c0 14.831-11.988 26.819-26.82 26.819z"
              />
            </svg>
          </ButtonOAuth2>
        )}

        {!!providers?.auth0 && (
          <ButtonOAuth2 text={`${i18n.text} Auth0`} href="/auth/auth0/signin">
            {/* NOTE: use inline SVG instead of simple-icons-auth0 to avoid having to load simple-icons collection (4.4MB) */}
            <svg
              className="mr-4 w-20px h-20px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="#EB5A2B"
                d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.552c3.755-2.81 5.182-7.688 3.815-12.015l-6.16 4.58l2.343 7.45l-6.157-4.597l-6.158 4.58l2.358-7.433l-6.188-4.55l7.63-.045L12.008 0l2.356 7.404l7.615.044z"
              />
            </svg>
          </ButtonOAuth2>
        )}

        {!!providers?.okta && (
          <ButtonOAuth2 text={`${i18n.text} Okta`} href="/auth/okta/signin">
            {/* NOTE: use inline SVG instead of simple-icons-okta to avoid having to load simple-icons collection (4.4MB) */}
            <svg
              className="mr-4 w-20px h-20px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 0C5.389 0 0 5.35 0 12s5.35 12 12 12s12-5.35 12-12S18.611 0 12 0m0 18c-3.325 0-6-2.675-6-6s2.675-6 6-6s6 2.675 6 6s-2.675 6-6 6"
              />
            </svg>
          </ButtonOAuth2>
        )}

        {
          /* {!!providers?.oauth2 && (
          <ButtonOAuth2 text={`${i18n.text} Custom`} href="/auth/oauth2/signin">
            <div className="mr-4 w-20px h-20px mdi-code-json" />
          </ButtonOAuth2>
        )} */
        }
      </div>
    </>
  );
}

function ButtonEmail() {
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
        {i18n.emailButton}
      </Button>
    </div>
  );
}

function ButtonNetzo(
  props: {
    text: string;
    href: string;
    children: React.ReactNode;
  },
) {
  return (
    <a
      href={props.href}
      className={cn(buttonVariants({ variant: "outline" }))}
    >
      {props.children} {props.text}
    </a>
  );
}

function ButtonOAuth2(
  props: {
    text: string;
    href: string;
    children: React.ReactNode;
  },
) {
  return (
    <a
      href={props.href}
      className={cn(buttonVariants({ variant: "outline" }))}
    >
      {props.children} {props.text}
    </a>
  );
}
