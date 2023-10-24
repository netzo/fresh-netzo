import type { JSX } from "preact";
import { PageProps } from "$fresh/server.ts";
import { AuthForm } from "../components/AuthForm.tsx";
import { AuthState } from "../plugin.ts";
import { cn } from "netzo/components/utils.ts";
import { buttonVariants } from "netzo/components/ui/button.tsx";

export type AuthPageProps = PageProps<unknown, AuthState>;

export default (props: AuthPageProps) => {
  const { sessionId, isAuthenticated, options } = props.state;
  const { title, description, favicon, image } = options?.meta ?? {};
  return (
    <div className="h-[100dvh] w-[100dvw] flex flex-col bg-muted">
      <header className="flex justify-between items-center p-4">
        <div className="flex">
          {/* NOTE: use dark:filter-invert (in image.class) to invert color on dark */}
          {image?.src && (
            <img
              {...image}
              className={cn("w-auto h-12 my-auto mr-3", image.class)}
            />
          )}
          <div className="grid">
            <h1 className="my-auto text-2xl font-semibold dark:text-white">
              {title}
            </h1>
            <p className="text-sm dark:text-gray-300">{description}</p>
          </div>
        </div>
      </header>

      <section className="flex-1 grid place-items-center p-4">
        <div className="grid gap-6 max-w-[350px]">
          <AuthForm {...props} />

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
      </section>

      <footer className="flex justify-center items-center p-4">
        <a
          href="https://netzo.io"
          target="_blank"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Built with Netzo
        </a>
      </footer>
    </div>
  );
};
