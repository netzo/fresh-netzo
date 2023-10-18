import { defineRoute } from "$fresh/server.ts";
import { cn } from "netzo/components/utils.ts"
import { buttonVariants } from "netzo/components/ui/button.tsx"
import { UserAuthForm } from "@/islands/user-auth-form.tsx"
import { AuthState } from "netzo/modules/auth/fresh.plugin.ts";

export default defineRoute<AuthState>((request, ctx) => {
  const { sessionId , isAuthenticated} = ctx.state;
  // if (isAuthenticated) {
  //   console.debug("[auth] User is already logged in, redirecting to /");
  //   return Response.redirect("http://localhost:8000/");
  // }
  return (
    <html className="h-full">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Netzo!</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="https://netzo.io/favicon.svg"
        />
      </head>
      <body className="h-full">
      <div className="md:hidden">
        <img
          src="https://netzo.io/favicon.svg"
          width={1280}
          height={843}
          alt="Authentication"
          className="block"
        />
      </div>
      <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <a
          href={isAuthenticated ? "/oauth/signout" : "/oauth/signin"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </a>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      </body>
    </html>
  );
});
